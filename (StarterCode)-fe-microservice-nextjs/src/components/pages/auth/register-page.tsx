"use client";
import RegisterForm from "@/components/fragments/form/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="space-y-4 w-full">
      <h2 className="font-bold text-lg text-center">Register</h2>

      <RegisterForm />
    </div>
  );
}
