"use client";
import Link from "next/link";
import Button from "@/components/ui/button/button";
import TextInput from "@/components/ui/input/text-input";
import { useLogin } from "@/features/auth/use-login";

export default function LoginForm() {
  const { formik, isLoading } = useLogin();

  const EmailIcon = (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const LockIcon = (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white space-y-4 w-full max-w-sm mx-auto py-2">
      <TextInput
        label="Email Address"
        type="text"
        name="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        error={formik.errors.email}
        touched={formik.touched.email}
        placeholder="Enter your email address"
        icon={EmailIcon}
      />

      <TextInput
        label="Password"
        type="password"
        name="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        error={formik.errors.password}
        touched={formik.touched.password}
        placeholder="••••••••"
        icon={LockIcon}
      />

      <div className="pt-2">
        <Button type="submit" disabled={isLoading} className="w-full py-2.5">
          {isLoading ? "Signing in..." : "Login"}
        </Button>
      </div>

      <div className="text-center text-sm pt-2">
        <span className="text-gray-400">{"Don't have an account? "}</span>
        <Link href="/register" className="text-indigo-650 hover:text-indigo-700 font-semibold hover:underline">
          Register here
        </Link>
      </div>
    </form>
  );
}
