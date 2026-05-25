import type { Metadata } from "next";
import "@/styles/global.css";
import DriverLayout from "@/components/layouts/driver/layout-driver";

export const metadata: Metadata = {
  title: "Driver Dashboard",
  description: "Driver dashboard for managing orders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DriverLayout>{children}</DriverLayout>
  );
}
