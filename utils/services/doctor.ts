import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { daysOfWeek } from "..";
import { processAppointments } from "./patient";

export async function getDoctors() {
  try {
    const doctor = await db.doctor.findMany({});

    return { success: true, data: doctor, status: 200 };
  } catch (error) {
    return {
      success: false,
      message: "International Server Error",
      status: 500,
    };
  }
}

export async function getDoctorDashboardStats() {
  try {
    const { userId } = await auth();

    const todayDate = new Date().getDay();
    const today = daysOfWeek[todayDate];

    const [totalPatient, totalNurses, appointments, doctors] =
      await Promise.all([
        db.patient.count(),
        db.staff.count({ where: { role: "NURSE" } }),
        db.appointment.findMany({
          where: { doctor_id: userId!, appointment_date: { lte: new Date() } },
          include: {
            patient: {
              select: {
                first_name: true,
                last_name: true,
                gender: true,
                date_of_birth: true,
                colorCode: true,
                img: true,
              },
            },
            doctor: {
              select: {
                name: true,
                specialization: true,
                img: true,
                colorCode: true,
              },
            },
          },
          orderBy: { appointment_date: "desc" },
        }),
        db.doctor.findMany({
          where: {
            working_days: {
              some: { day: { equals: today, mode: "insensitive" } },
            },
          },
          select: {
            id: true,
            name: true,
            specialization: true,
            img: true,
            colorCode: true,
            working_days: true,
          },
          take: 5,
        }),
      ]);

    const { appointmentCounts, monthlyData } = await processAppointments(
      appointments
    );

    const last5Records = appointments.slice(0, 5);
    const availableDoctors = doctors.slice(0, 5);

    return {
      totalNurses,
      totalPatient,
      appointmentCounts,
      last5Records,
      availableDoctors: doctors,
      totalAppointment: appointments?.length,
      monthlyData,
    };
  } catch (error) {
    return { success: false, message: "Internal Server Error", status: 500 };
  }
}

export async function getRatingById(id: string) {
  try {
    const data = await db.rating.findMany({
      where: { staff_id: id },
      include: {
        patient: { select: { last_name: true, first_name: true } },
      },
    });

    const totalRatings = data?.length;
    const sumRatings = data?.reduce((sum, el) => sum + el.rating, 0);

    const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;
    const formattedRatings = (Math.round(averageRating * 10) / 10).toFixed(1)

    return { totalRatings, averageRating: formattedRatings, ratings: data };
  } catch (error) {
    return { success: false, message: "Internal Server Error", status: 500 };
  }
}
