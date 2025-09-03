import React from "react";
import { Card } from "../ui/card";
import { Diagnosis, Doctor } from "@/lib/generated/prisma";
import { Separator } from "@radix-ui/react-select";

interface ExtendedMedicalRecord extends Diagnosis {
  doctor: Doctor;
}

const MedicalHistoryCard = ({
  record,
  index,
}: {
  record: ExtendedMedicalRecord;
  index: number;
}) => {
  return (
    <Card className="shadow-none">
      <div className="space-y-6 pt-4">
        <div className="flex gap-6 justify-between">
          <div>
            <span className="text-sm text-gray-500">Appointment ID</span>
            <p className="text-xl font-medium"># {record.id}</p>
          </div>
          {index === 0 && (
            <div>
              <div className="px-4 h-8 text-center bg-blue-100 rounded-full font-semibold text-blue-600">
                <span>Recent</span>
              </div>
            </div>
          )}

          <div>
            <span className="text-sm text-gray-500">Date</span>
            <p className="text-xl font-medium">
              {record.created_at.toLocaleDateString()}
            </p>
          </div>
        </div>
        <Separator />
        <div>
          <span className="text-sm text-gray-500">Diagnosis</span>
          <p className="text-lg font-medium">{record.diagnosis}</p>
        </div>
        <Separator />
        <div>
          <span className="text-sm text-gray-500">Symptoms</span>
          <p className="text-lg font-medium">{record.symptoms}</p>
        </div>
        <Separator />
        <div>
          <span className="text-sm text-gray-500">Addiitonal Note</span>
          <p className="text-lg font-medium">{record.notes}</p>
        </div>
        <Separator />
        <div>
          <span className="text-sm text-gray-500">Doctor</span>
          <p className="text-lg font-medium">{record.doctor.name}</p>
          <span>{record.doctor.specialization}</span>
        </div>
      </div>
    </Card>
  );
};

export default MedicalHistoryCard;
