import { AppointmentStatus } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";

const status_color = {
  PENDING: "bg-yellow-600/15 text-yellow-600",
  SCHEDULED: "bg-emerald-600/15 text-emerald-600",
  CANCELLED: "bg-red-600/15 text-red-600",
  COMPLETED: "bg-blue-600/15 text-blue-600",
};
const AppointmentStatusIndicator = ({
  status,
}: {
  status: AppointmentStatus;
}) => {
  return (
    <p
      className={cn(
        "w-fit px-2 py-1 rounded-full capitalize text-sm lg:text-sm",
        status_color[status]
      )}
    >
      {status}
    </p>
  );
};

export default AppointmentStatusIndicator;
