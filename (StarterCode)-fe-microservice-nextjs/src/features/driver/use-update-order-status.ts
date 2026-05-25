import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrder } from "@/services/actions/order.actions";
import { TOrderStatus } from "@/types/order.types";
import toast from "react-hot-toast";

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: TOrderStatus }) => {
      return await updateOrder({
        Id: id,
        body: { status },
      });
    },
    onSuccess: (data, variables) => {
      toast.success(`Order status updated to ${variables.status}`);
      // Invalidate order list query
      queryClient.invalidateQueries({
        queryKey: ["order-list"],
      });
      // Invalidate individual order detail query
      queryClient.invalidateQueries({
        queryKey: ["get-order-by-id", variables.id],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update order status");
    },
  });
};
