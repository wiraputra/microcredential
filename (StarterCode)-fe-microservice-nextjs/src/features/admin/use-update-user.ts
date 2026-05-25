import { UpdateUserSchema } from "@/schemas/user.schemas";
import { updateUser } from "@/services/actions/user.actions";
import { IUser, IUpdateUserRequest } from "@/types/user.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useUpdateUser = (user: IUser) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (body: IUpdateUserRequest) => {
      return await updateUser({
        Id: user.id,
        body,
      });
    },
    onSuccess: () => {
      formik.resetForm();
      toast.success("User updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["get-user-list"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-user-by-id", user.id],
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
    initialValues: <IUpdateUserRequest>{
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      role: user.role,
    },
    validationSchema: UpdateUserSchema,
    onSubmit: handleSubmit,
  });

  return { formik, isLoading: mutation.isPending };
};
