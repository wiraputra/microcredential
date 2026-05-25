import { formatDate } from "@/libs/utils/format-date";
import { IOrder } from "@/types/order.types";

interface IOrderCardProps {
  order: IOrder;
}

export default function OrderDetailCard({ order }: IOrderCardProps) {
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
    <div className="w-full bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Customer ID: {order.customerId}</h3>
          <p className="text-xs text-gray-400 font-mono mt-0.5">Order ID: #{order.id}</p>
        </div>
        {getStatusBadge(order.status)}
      </div>

      {/* Route Details */}
      <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2.5 before:bottom-2.5 before:w-[2px] before:bg-dashed before:border-l-2 before:border-gray-200">
        <div className="relative">
          <span className="absolute -left-[22px] top-1.5 w-3.5 h-3.5 rounded-full bg-blue-500 border-4 border-white ring-2 ring-blue-100"></span>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            Pickup point
          </p>
          <p className="text-sm text-gray-750 font-semibold mt-1">
            {order.pickup}
          </p>
        </div>

        <div className="relative">
          <span className="absolute -left-[22px] top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-4 border-white ring-2 ring-emerald-100"></span>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            Drop-off destination
          </p>
          <p className="text-sm text-gray-755 font-semibold mt-1">
            {order.destination}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
        <span>Created At</span>
        <span className="text-gray-600 font-normal normal-case">
          {formatDate(order.createdAt)}
        </span>
      </div>
    </div>
  );
}
