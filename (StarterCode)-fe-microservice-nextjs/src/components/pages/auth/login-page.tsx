"use client";
import LoginForm from "@/components/fragments/form/auth/login-form";

export default function LoginPage() {
  return (
    <div className="space-y-4 w-full">
      <h2 className="font-bold text-lg text-center">Login</h2>

      <LoginForm />
    </div>
  );
}
