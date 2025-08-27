import AppointmentContainer from "@/components/appointment-container";
import AppointmentQuickLinks from "@/components/appointment/appointment-quick-links";
import ChartContainer from "@/components/appointment/chart-container";
import PatientDetailsCard from "@/components/appointment/patient-details-card";
import { getAppointmentWithMedicalRecordsById } from "@/utils/services/appointment";
import React from "react";

const AppointmentDetailsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id } = await params;
  const search = await searchParams;
  const cat = (search?.cat as string) || "charts";

  const { data } = await getAppointmentWithMedicalRecordsById(Number(id));
  console.log(data);

  return (
    <div className="flex p-6 flex-col-reverse lg:flex-row w-full min-h-screen gap-10">
      {/* left */}
      <div className="w-full lg:w-[65%] flex flex-col gap-6">
        {cat === "charts" && <ChartContainer id={data?.patient_id} />}
        {/* {cat === "appointments" && <> <AppointmentContainer />} </> */}
      </div>
      {/* {cat === "diagnosis" && <DiagnosisContainer />} */}
      {/* {cat === "billing" && <BillingContainer />} */}
      {/* {cat === "medical-history" && <MedicalHistoryContainer />} */}
      {/* {cat === "payments" && <PaymentsContainer />} */}

      {/* right */}
      <div className="flex-1 space-y-6">
        <AppointmentQuickLinks staffId={data?.doctor_id as string} />
        <PatientDetailsCard data={data?.patient!} />
      </div>
    </div>
  );
};

export default AppointmentDetailsPage;
