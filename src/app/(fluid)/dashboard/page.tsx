import { DashboardProvider } from "@/components/dashboard/dashboard-context";
import { DashboardForUsers } from "@/components/dashboard/dashboard-for-user";

export default function DashboardArea() {
  return (
    <DashboardProvider>
      <DashboardForUsers />
    </DashboardProvider>
  );
}
