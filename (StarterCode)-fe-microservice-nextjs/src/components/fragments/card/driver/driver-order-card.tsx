import Link from "next/link";
import { IOrder } from "@/types/order.types";
import { useUpdateOrderStatus } from "@/features/driver/use-update-order-status";

interface DriverOrderCardProps {
  order: IOrder;
}

export default function DriverOrderCard({ order }: DriverOrderCardProps) {
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus();

  const getStatusBadge = (status: IOrder["status"]) => {
    switch (status) {
      case "CREATED":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wide">
            New Request
          </span>
        );
      case "PROCESS":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wide">
            On Process
          </span>
        );
      case "COMPLETED":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wide">
            Completed
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-50 text-gray-700 border border-gray-200 uppercase tracking-wide">
            {status}
          </span>
        );
    }
  };

  const handleAccept = () => {
    updateStatus({ id: order.id, status: "PROCESS" });
  };

  const handleComplete = () => {
    updateStatus({ id: order.id, status: "COMPLETED" });
  };

  return (
    <div className="bg-white border border-gray-100 hover:border-gray-200 shadow-xs hover:shadow-md rounded-2xl p-6 transition-all duration-300 w-full flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex-1 space-y-4">
        {/* Top Info */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-gray-400 font-mono">
            ORDER #{order.id}
          </span>
          <span className="text-xs text-gray-300">|</span>
          <span className="text-sm text-gray-500 font-medium">
            Customer ID: {order.customerId}
          </span>
          <span className="text-xs text-gray-300">|</span>
          {getStatusBadge(order.status)}
        </div>

        {/* Route Details */}
        <div className="relative pl-6 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-dashed before:border-l-2 before:border-gray-200">
          <div className="relative">
            <span className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white ring-2 ring-blue-100"></span>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
              Pickup Point
            </p>
            <p className="text-sm text-gray-800 font-medium mt-0.5">
              {order.pickup}
            </p>
          </div>
          <div className="relative">
            <span className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-100"></span>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
              Destination
            </p>
            <p className="text-sm text-gray-800 font-medium mt-0.5">
              {order.destination}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 self-end md:self-center">
        <Link href={`/driver/order/${order.id}`}>
          <button className="px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition duration-200 border border-gray-200/60 cursor-pointer">
            Detail
          </button>
        </Link>

        {order.status === "CREATED" && (
          <button
            onClick={handleAccept}
            disabled={isPending}
            className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition duration-200 disabled:opacity-50 cursor-pointer shadow-sm shadow-indigo-100"
          >
            {isPending ? "Accepting..." : "Accept Job"}
          </button>
        )}

        {order.status === "PROCESS" && (
          <button
            onClick={handleComplete}
            disabled={isPending}
            className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition duration-200 disabled:opacity-50 cursor-pointer shadow-sm shadow-emerald-100"
          >
            {isPending ? "Completing..." : "Complete Job"}
          </button>
        )}
      </div>
    </div>
  );
}
