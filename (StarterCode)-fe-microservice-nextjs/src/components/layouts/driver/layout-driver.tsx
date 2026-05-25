import DriverLayoutHeader from "@/components/fragments/header/driver-layout-header";
import { Toaster } from "react-hot-toast";

export default function DriverLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DriverLayoutHeader />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex-1 py-4 w-full">{children}</div>
    </>
  );
}
