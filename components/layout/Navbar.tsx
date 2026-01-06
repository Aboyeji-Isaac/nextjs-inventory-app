"use client";

import { Menu } from "lucide-react";

export default function Navbar({
  title,
  onMenuClick,
}: {
  title: string;
  onMenuClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 h-16 flex items-center gap-4 border-b bg-background text-foreground selection:bg-primary selection:text-primary-foreground px-4 lg:px-6">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Page title */}
      <h1 className="text-lg font-semibold">{title}</h1>
    </header>
  );
}
