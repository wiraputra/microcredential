
import RegisterPage from "@/components/pages/auth/register-page";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Register",
};

export default function Register() {
  return <RegisterPage />;
}
