import { cn } from "@/lib/utils";
import { Icon, LucideIcon } from "lucide-react";
import React from "react";
import { CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { formatNumber } from "@/utils";

interface CardProps {
  title: string;
  icon: LucideIcon;
  note: string;
  value: number;
  className?: string;
  iconClassName?: string;
  link: string;
}
const CardIcon = ({ icon: Icon }: { icon: LucideIcon }) => {
  return <Icon />;
};

const StatCard = ({
  title,
  icon,
  note,
  value,
  className,
  iconClassName,
  link,
}: CardProps) => {
  return (
    <div className={cn("w-full md:w-[330px] 2xl:w-[250px]", className)}>
      <CardHeader className="flex flex-row items-center justify-between py-3 capitalize">
        <h3>{title}</h3>
        <Button asChild size={"sm"} variant={"outline"}>
          <Link href={link}>See Details</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "w-10 h-10 bg-violet-50 rounded-full flex items-center justify-center text-violet-600",
              iconClassName
            )}
          >
            <CardIcon icon={icon} />
          </div>
          <h2 className="text-2xl 2xl:text-3xl font-semibold">
            {formatNumber(value)}
          </h2>
        </div>
      </CardContent>
      <CardFooter className="pb-3">
        <p className="text-sm text-gray-500">{note}</p>
      </CardFooter>
    </div>
  );
};

export default StatCard;
