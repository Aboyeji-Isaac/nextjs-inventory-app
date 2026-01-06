"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import Navbar from "./Navbar";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/inventory": "Inventory",
  "/add-product": "Add Product",
  "/settings": "Settings",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen  bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Sidebar />
      <MobileSidebar open={open} onClose={() => setOpen(false)} />

      <div className="lg:pl-64">
        <Navbar
          title={titles[pathname] ?? ""}
          onMenuClick={() => setOpen(true)}
        />

        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
