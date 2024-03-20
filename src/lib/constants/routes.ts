import { LineChartIcon, TableIcon, HomeIcon } from "@/components/icons";

export const DASHBOARD_ROUTES = [
  {
    label: "Overview",
    slug: "overview",
    icon: HomeIcon,
  },
  {
    label: "Period details",
    slug: "period-details",
    icon: LineChartIcon,
  },
  {
    label: "Forecast",
    slug: "reservation-forecast",
    icon: TableIcon,
  },
];
