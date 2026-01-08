"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Package, Plus, Settings } from "lucide-react";
import { UserButton } from "@stackframe/stack";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Add Product", href: "/add-product", icon: Plus },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col border-r bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 text-xl font-semibold">
        MyApp
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href; 

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition
                ${
                  isActive
                    ? "bg-background text-foreground selection:bg-primary selection:text-primary-foreground"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User profile */}
      <div className="border-t p-4">
        <UserButton showUserInfo />
      </div>
    </aside>
  );
}
