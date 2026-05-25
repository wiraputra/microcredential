import { UpdateOrderSchema } from "@/schemas/order.schemas";
import { updateOrder } from "@/services/actions/order.actions";
import { IOrder, IUpdateOrderRequest } from "@/types/order.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useUpdateOrder = (order: IOrder) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (body: IUpdateOrderRequest) => {
      return await updateOrder({
        Id: order.id,
        body,
      });
    },
    onSuccess: () => {
      formik.resetForm();
      toast.success("Order updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["get-order-list"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-order-by-id", order.id],
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
    initialValues: <IUpdateOrderRequest>{
      status: order.status,
    },
    validationSchema: UpdateOrderSchema,
    onSubmit: handleSubmit,
  });

  return { formik, isLoading: mutation.isPending };
};
