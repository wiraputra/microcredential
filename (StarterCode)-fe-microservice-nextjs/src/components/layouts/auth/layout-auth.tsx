import AuthLayoutHeader from "@/components/fragments/header/auth-layout-header";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthLayoutHeader />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex-1 py-4 w-full">{children}</div>
    </>
  );
}
