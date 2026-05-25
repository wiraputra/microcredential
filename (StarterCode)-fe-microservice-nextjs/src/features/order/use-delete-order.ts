import { deleteOrder } from "@/services/actions/order.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (Id: number) => {
      return await deleteOrder(Id);
    },
    onSuccess: () => {
      toast.success("Order deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["get-order-list"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = async (Id: number) => {
    mutation.mutate(Id);
  };

  return { handleDelete, isLoading: mutation.isPending };
};
