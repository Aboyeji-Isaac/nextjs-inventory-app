"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, BarChart3, Package, Plus, Settings } from "lucide-react";
import { UserButton } from "@stackframe/stack";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Add Product", href: "/add-product", icon: Plus },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="relative w-64 bg-background text-foreground selection:bg-primary selection:text-primary-foreground h-full flex flex-col">
        <div className="h-16 px-4 flex items-center justify-between border-b">
          <span className="font-semibold text-lg">MyApp</span>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                  ${
                    isActive
                      ? "bg-background text-foreground selection:bg-primary selection:text-primary-foreground "
                      : "text-gray-600 hover:bg-gray-50"
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-4">
          <UserButton showUserInfo />
        </div>
      </div>
    </div>
  );
}
