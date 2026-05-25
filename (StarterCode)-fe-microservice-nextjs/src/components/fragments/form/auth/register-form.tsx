"use client";
import Button from "@/components/ui/button/button";
import TextInput from "@/components/ui/input/text-input";
import SelectInput from "@/components/ui/input/select-input";
import { useRegister } from "@/features/auth/use-register";
import { USER_ROLE_OPTIONS } from "@/libs/constant/options";
import Link from "next/link";

export default function RegisterForm() {
  const { formik, isLoading } = useRegister();

  const UserIcon = (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const EmailIcon = (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const LockIcon = (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  const PhoneIcon = (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );

  const ShieldIcon = (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white space-y-4 w-full max-w-sm mx-auto py-2">
      <TextInput
        label="Name"
        type="text"
        name="name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        error={formik.errors.name}
        touched={formik.touched.name}
        placeholder="e.g. John Doe"
        icon={UserIcon}
      />

      <TextInput
        label="Email Address"
        type="email"
        name="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        error={formik.errors.email}
        touched={formik.touched.email}
        placeholder="e.g. john@example.com"
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

      <TextInput
        label="Phone Number"
        type="text"
        name="phone"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.phone}
        error={formik.errors.phone}
        touched={formik.touched.phone}
        placeholder="e.g. +62812345678"
        icon={PhoneIcon}
      />

      <SelectInput
        label="Select Account Role"
        name="role"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.role}
        error={formik.errors.role}
        touched={formik.touched.role}
        icon={ShieldIcon}
      >
        {USER_ROLE_OPTIONS.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </SelectInput>

      <div className="pt-2">
        <Button type="submit" disabled={isLoading} className="w-full py-2.5">
          {isLoading ? "Creating Account..." : "Register"}
        </Button>
      </div>

      <div className="text-center text-sm pt-2">
        <span className="text-gray-400">{"Already have an account? "}</span>
        <Link href="/login" className="text-indigo-650 hover:text-indigo-700 font-semibold hover:underline">
          Login here
        </Link>
      </div>
    </form>
  );
}
