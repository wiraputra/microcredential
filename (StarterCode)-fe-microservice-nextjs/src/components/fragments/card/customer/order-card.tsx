//TASK 4
// Buatkan Card untuk menampilkan Order List berdasarkan data yang didapatkan dari get order list.


import Button from "@/components/ui/button/button";
import Link from "next/link";
import { IOrder } from "@/types/order.types";
import { deleteOrder } from "@/services/actions/order.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface OrderCardProps {
  order: IOrder;
}

export default function OrderCard({ order }: OrderCardProps) {
  const queryClient = useQueryClient();

  const { mutate: mutateDelete } = useMutation({
    mutationFn: async () => await deleteOrder(order.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-list"] });
    },
  });

  const handleDelete = () => {
    if (confirm("Are you sure?")) {
      mutateDelete();
    }
  };

  const getStatusBadge = (status: IOrder["status"]) => {
    switch (status) {
      case "CREATED":
        return (
          <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 uppercase tracking-wider">
            Created
          </span>
        );
      case "PROCESS":
        return (
          <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 uppercase tracking-wider">
            On Process
          </span>
        );
      case "COMPLETED":
        return (
          <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 uppercase tracking-wider">
            Completed
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-gray-50 text-gray-700 border border-gray-200/60 uppercase tracking-wider">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-gray-100 hover:border-gray-200 shadow-xs hover:shadow-md rounded-2xl p-5 transition-all duration-300 w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="space-y-3 flex-1 w-full">
        {/* Top order info */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-gray-400 font-mono">
            TRIP #{order.id}
          </span>
          <span className="text-xs text-gray-300">|</span>
          <span className="text-xs text-gray-500 font-medium">
            Customer ID: {order.customerId}
          </span>
          <span className="text-xs text-gray-300">|</span>
          {getStatusBadge(order.status)}
        </div>

        {/* Pickup & Destination Timeline */}
        <div className="relative pl-5 space-y-2.5 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-dashed before:border-l-2 before:border-gray-100">
          <div className="relative">
            <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white ring-1 ring-blue-150"></span>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Pickup Point
            </p>
            <p className="text-sm text-gray-700 font-medium mt-0.5">{order.pickup}</p>
          </div>
          <div className="relative">
            <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-150"></span>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Destination
            </p>
            <p className="text-sm text-gray-700 font-medium mt-0.5">{order.destination}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 w-full md:w-auto justify-end self-end md:self-center">
        <Link href={`/customer/order/${order.id}`}>
          <Button variant="outline" className="text-xs px-3 py-1.5 h-8">
            Detail
          </Button>
        </Link>
        <Link href={`/customer/edit/${order.id}`}>
          <Button variant="outline" className="text-xs px-3 py-1.5 h-8 border-emerald-250 text-emerald-600 hover:bg-emerald-50/30 hover:border-emerald-350 hover:text-emerald-700">
            Edit
          </Button>
        </Link>
        <Button
          variant="danger"
          className="text-xs px-3 py-1.5 h-8"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}