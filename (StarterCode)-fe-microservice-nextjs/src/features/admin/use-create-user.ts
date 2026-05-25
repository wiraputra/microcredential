import { CreateUserSchema } from "@/schemas/user.schemas";
import { createUser } from "@/services/actions/user.actions";
import { ICreateUserRequest } from "@/types/user.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useCreateUser = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (body: ICreateUserRequest) => {
      return await createUser(body);
    },
    onSuccess: () => {
      formik.resetForm();
      toast.success("User created successfully");

      queryClient.invalidateQueries({
        queryKey: ["get-user-list"],
      });

      router.replace("/admin");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async () => {
    mutation.mutate(formik.values);
  };

  const formik = useFormik({
    initialValues: <ICreateUserRequest>{
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "ADMIN"
    },
    validationSchema: CreateUserSchema,
    onSubmit: handleSubmit,
  });

  return { formik, isLoading: mutation.isPending };
};
