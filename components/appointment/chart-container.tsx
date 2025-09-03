import { getVitalSignData } from "@/utils/services/medical";
import React from "react";
import BloodPressureChart from "./blood-pressure-chart";
import HeartRateChart from "./heart-rate-chart";

const ChartContainer = async ({ id }: { id: string }) => {
  const { data, average, heartRateData, averageHeartRate } =
    await getVitalSignData(id.toString());

  return <div>
    <BloodPressureChart data={data} average={average} />
    <HeartRateChart data={heartRateData} average={averageHeartRate} />
  </div>;
};

export default ChartContainer;
