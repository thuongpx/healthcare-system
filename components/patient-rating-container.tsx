import db from "@/lib/db";
import { useAuth } from "@clerk/nextjs";
import React from "react";
import RatingList from "./rating-list";

const PatientRatingContainer = async () => {
  const { userId } = await useAuth();

  const data = await db.rating.findMany({
    take: 10,
    where: { patient_id: userId! },
    include: { patient: { select: { last_name: true, first_name: true } } },
    orderBy: { created_at: "desc" },
  });

  if (!data) return null;

  return <div>
    <RatingList data={data} />
  </div>;
};

export default PatientRatingContainer;
