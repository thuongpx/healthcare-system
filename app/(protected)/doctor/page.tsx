import { checkRole, getRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import React from "react";

const DoctorDashboard = async () => {
  const isDoctor = await checkRole("DOCTOR");

  const role = await getRole();

  console.log("role", role)

  if (!isDoctor) {
    redirect(`/${role}`);
  }
  return <div>DoctorDashboard</div>;
};

export default DoctorDashboard;
