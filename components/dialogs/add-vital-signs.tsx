import { VitalSignsSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Form } from "../ui/form";
import { CustomInput } from "../custom-input";
import { toast } from "sonner";
import { addVitalSigns } from "@/app/actions/appointment";

interface AddVitalSignsProps {
  patientId: string;
  doctorId: string;
  appointmentId: string;
  medicalId?: string;
}

export type VitalSignsFormData = z.infer<typeof VitalSignsSchema>;

const AddVitalSigns = ({
  patientId,
  doctorId,
  appointmentId,
  medicalId,
}: AddVitalSignsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<VitalSignsFormData>({
    resolver: zodResolver(VitalSignsSchema),
    defaultValues: {
      patient_id: patientId,
      medical_id: medicalId,
      body_temperature: undefined,
      heartRate: undefined,
      systolic: undefined,
      diastolic: undefined,
      respiratory_rate: undefined,
      oxygen_saturation: undefined,
      weight: undefined,
      height: undefined,
    },
  });

  const handleSubmit = async (data: VitalSignsFormData) => {
    try {
        setIsLoading(true);
        const res = await addVitalSigns(data,appointmentId, doctorId)

        if(res.success) {
            router.refresh()
            toast.success(res.msg)
            form.reset()
        } else {
            toast.error(res.msg)
        }
    } catch (error) {
        toast.error("Failed to add vital signs")
    } finally {
        setIsLoading(false)
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size={"sm"}
            variant={"outline"}
            className="text-sm font-normal"
          >
            <Plus size={22} className="text-gray-500" /> Add Vital Signs
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Vital Signs</DialogTitle>
            <DialogDescription>
              Add vital signs for the patient
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <CustomInput
                  type="input"
                  control={form.control}
                  name="body_temperature"
                  label="Body Temperature (C)"
                  placeholder="eg.:37.5"
                />

                <CustomInput
                  type="input"
                  control={form.control}
                  name="heartRate"
                  label="Heart Rate (BPM)"
                  placeholder="eg.:54-123"
                />
              </div>

              <div className="flex items-center gap-4">
                <CustomInput
                  type="input"
                  control={form.control}
                  name="systolic"
                  label="Systolic BP"
                  placeholder="eg.: 120"
                />

                <CustomInput
                  type="input"
                  control={form.control}
                  name="diastolic"
                  label="Diastolic BP"
                  placeholder="eg.: 80"
                />
              </div>
              <div className="flex items-center gap-4">
                <CustomInput
                  type="input"
                  control={form.control}
                  name="weight"
                  label="Weight (Kg)"
                  placeholder="eg.: 80"
                />

                <CustomInput
                  type="input"
                  control={form.control}
                  name="height"
                  label="Height (cm)"
                  placeholder="eg.: 170"
                />
              </div>
              <div className="flex items-center gap-4">
                <CustomInput
                  type="input"
                  control={form.control}
                  name="respiratory_rate"
                  label="Respiratory Rate"
                  placeholder="Optional"
                />

                <CustomInput
                  type="input"
                  control={form.control}
                  name="oxygen_saturation"
                  label="Oxygen Saturation"
                  placeholder="Optional"
                />
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddVitalSigns;
