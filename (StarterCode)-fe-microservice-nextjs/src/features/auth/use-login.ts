"use client";

import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

import { login } from "@/services/actions/auth.actions";

// tipe request
interface ILoginRequest {
  email: string;
  password: string;
}


export const useLogin = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (body: ILoginRequest) => {
      return await login(body);
    },

    onSuccess: (res) => {
      try {
        const token = res.token;

        // simpan token
        localStorage.setItem("token", token);

        // decode JWT
        const decoded = jwtDecode<{ groups?: string[] }>(token);

        const role = decoded.groups?.[0];
        console.log(decoded);

        toast.success("Login berhasil");

        // redirect berdasarkan role
        if (role === "ADMIN") {
          router.replace("/admin");
        } else if (role === "CUSTOMER") {
          router.replace("/customer");
        } else if (role === "DRIVER") {
          router.replace("/driver");
        } else {
          toast.error("Role tidak dikenali");
        }
      } catch {
        toast.error("Token tidak valid");
      }
    },

    onError: (error) => {
      toast.error(error.message || "Login gagal");
    },
  });

  const handleSubmit = async () => {
    mutation.mutate(formik.values);
  };

  const formik = useFormik<ILoginRequest>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
  });

  return {
    formik,
    isLoading: mutation.isPending,
  };
};
