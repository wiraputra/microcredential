import { deleteUser } from "@/services/actions/user.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (Id: number) => {
      return await deleteUser(Id);
    },
    onSuccess: () => {
      toast.success("User deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["get-user-list"],
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
