"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mt-[72px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
