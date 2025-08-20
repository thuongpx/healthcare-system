import db from "@/lib/db";

export async function getDoctors() {
  try {
    const doctor = await db.doctor.findMany({})
      
    return { success: true, data: doctor, status: 200 };
  } catch (error) {
    return {
      success: false,
      message: "International Server Error",
      status: 500,
    };
  }
}
