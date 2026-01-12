import DashboardLayout from "@/components/layout/DashboardLayout";
import { ToastProvider } from "@/components/providers/toast-provider"

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>
    <ToastProvider />
    {children}
    </DashboardLayout>;
}
