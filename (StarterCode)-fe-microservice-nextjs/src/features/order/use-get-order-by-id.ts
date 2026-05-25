import { getOrderById } from "@/services/actions/order.actions";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderById = (Id: number) => {
  return useQuery({
    queryKey: ["get-order-by-id", Id],
    queryFn: () => getOrderById(Id),
  });
};
