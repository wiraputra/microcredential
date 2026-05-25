//TASK 3
// Buatkan Features untuk get order list dengan menggunakan OrderInstance yang sudah dibuat sebelumnya

import { useQuery } from "@tanstack/react-query";
import { getOrderList } from "@/services/actions/order.actions";

export const useGetOrderList = () => {
  return useQuery({
    queryKey: ["order-list"],
    queryFn: async () => {
      const response = await getOrderList();
      return response;
    },
  });
};