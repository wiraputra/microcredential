import { getUserById } from "@/services/actions/user.actions";
import { useQuery } from "@tanstack/react-query";

export const useGetUserById = (Id: number) => {
  return useQuery({
    queryKey: ["get-user-by-id", Id],
    queryFn: () => getUserById(Id),
  });
};
