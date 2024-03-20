import { DashboardLayout } from "@/components/layout/dashboard-layout";
//This wraps the 3 main routes in the dashboard

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
