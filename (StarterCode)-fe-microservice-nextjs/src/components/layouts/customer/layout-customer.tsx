import CustomerLayoutHeader from "@/components/fragments/header/customer-layout-header";
import { Toaster } from "react-hot-toast";

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CustomerLayoutHeader />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex-1 py-4 w-full">{children}</div>
    </>
  );
}
