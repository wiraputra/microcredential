import { getUserList } from "@/services/actions/user.actions";
import { useQuery } from "@tanstack/react-query";

export const useGetUserList = () => {

  return useQuery({
    queryKey: ["get-user-list"],
    queryFn: () => getUserList(),
    refetchOnMount: true,
  });
};
