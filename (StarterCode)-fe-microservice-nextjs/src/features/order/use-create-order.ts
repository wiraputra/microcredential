import { CreateOrderSchema } from "@/schemas/order.schemas";
import { createOrder } from "@/services/actions/order.actions";
import { ICreateOrderRequest } from "@/types/order.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useCreateOrder = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (body: ICreateOrderRequest) => {
      return await createOrder(body);
    },
    onSuccess: () => {
      formik.resetForm();
      toast.success("Order created successfully");

      queryClient.invalidateQueries({
        queryKey: ["get-order-list"],
      });

      router.replace("/customer");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async () => {
    mutation.mutate(formik.values);
  };

  const formik = useFormik({
    initialValues: <ICreateOrderRequest>{
      customerId: 0,
      pickup: "",
      destination: ""
    },
    validationSchema: CreateOrderSchema,
    onSubmit: handleSubmit,
  });

  return { formik, isLoading: mutation.isPending };
};
