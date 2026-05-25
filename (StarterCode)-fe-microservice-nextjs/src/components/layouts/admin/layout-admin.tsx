import AdminLayoutHeader from "@/components/fragments/header/admin-layout-header";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminLayoutHeader />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex-1 py-4 w-full">{children}</div>
    </>
  );
}
