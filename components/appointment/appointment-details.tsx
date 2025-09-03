import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import SmallCard from "../small-card";
import { format } from "date-fns";

interface AppointmentDetailsProps {
  id: number | string;
  patient_id: string;
  appointment_date: Date;
  time: string;
  notes: string;
}

const AppointmentDetails = ({
  id,
  patient_id,
  appointment_date,
  time,
  notes,
}: AppointmentDetailsProps) => {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Appointment Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex">
          <SmallCard label="Appointment #" value={`# ${id}`} />
          <SmallCard
            label="Date"
            value={format(appointment_date, "MMM d, yyyy")}
          />
          <SmallCard label="Appointment Date" value={time} />
        </div>
        <div>
          <span className="text-sm font-medium">Additional Note</span>
          <p className="text-sm text-gray-500">{notes || "No notes"}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentDetails;
