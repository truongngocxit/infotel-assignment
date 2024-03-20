"use client";
import { LineChart } from "@/components/common/line-chart";
import { sampleForecastData } from "@/lib/data/sampledata_forecast";
import { format, parse } from "date-fns";
import { useMemo, useState } from "react";
import { Select } from "@/components/ui/select";
import { FORECAST_PERIODS } from "@/lib/constants/misc";
import { differenceInCalendarMonths, addMonths } from "date-fns";
import { Card } from "@/components/ui/card";

const DATA = [
  {
    id: 1,
    data: sampleForecastData.map((entry) => ({
      y: entry["Arr. Rooms"],
      x: format(parse(entry.Date, "dd-MMM-yyyy", new Date()), "yyyy-MM-dd"),
    })),
    settings: {
      strokeColor: "#023047",
    },
  },
  {
    id: 2,
    data: sampleForecastData.map((entry) => ({
      y: entry["Dep. Rooms"],
      x: format(parse(entry.Date, "dd-MMM-yyyy", new Date()), "yyyy-MM-dd"),
    })),
    settings: {
      strokeColor: "#fb8500",
    },
  },
  {
    id: 3,
    data: sampleForecastData.map((entry) => ({
      y: entry["Total Occ."],
      x: format(parse(entry.Date, "dd-MMM-yyyy", new Date()), "yyyy-MM-dd"),
    })),
    settings: {
      strokeColor: "#8ecae6",
    },
  },
];

export default function PageIndex() {
  const [period, setPeriod] = useState(FORECAST_PERIODS[0].value);

  const forecastData = useMemo(() => {
    return DATA.map((entry) => {
      const firstDayOfForecast = entry?.data?.[0].x;
      return {
        ...entry,
        data: entry.data.filter(
          (datum) =>
            differenceInCalendarMonths(datum.x, firstDayOfForecast) <= +period
        ),
      };
    });
  }, [period]);

  return (
    <>
      <Card className="h-96 flex flex-col">
        <div className="flex justify-between">
          <span className="text-2xl font-bold">Sales forecast</span>
          <Select
            // className="self-end"
            options={FORECAST_PERIODS}
            value={period}
            onChange={(period) => setPeriod(period)}
          />
        </div>

        <LineChart entries={forecastData} />
      </Card>
    </>
  );
}
