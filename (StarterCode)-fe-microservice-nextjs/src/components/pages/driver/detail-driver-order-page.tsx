"use client";

import Link from "next/link";
import { useGetOrderById } from "@/features/order/use-get-order-by-id";
import { useUpdateOrderStatus } from "@/features/driver/use-update-order-status";
import SpinnerLoading from "@/components/ui/loading/spinner-loading";
import ErrorText from "@/components/ui/text/error-text";
import { useParams } from "next/navigation";

export default function DetailDriverOrderPage() {
  const { Id } = useParams<{ Id: string }>();
  const idNumber = Number(Id);
  const { data: order, isLoading, error } = useGetOrderById(idNumber);
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus();

  const handleAccept = () => {
    updateStatus({ id: idNumber, status: "PROCESS" });
  };

  const handleComplete = () => {
    updateStatus({ id: idNumber, status: "COMPLETED" });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CREATED":
        return (
          <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wider">
            New Request
          </span>
        );
      case "PROCESS":
        return (
          <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
            On Process
          </span>
        );
      case "COMPLETED":
        return (
          <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
            Completed
          </span>
        );
      default:
        return (
          <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-gray-50 text-gray-700 border border-gray-200 uppercase tracking-wider">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 py-4 px-2">
      {/* Back Navigation Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/driver"
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-gray-150 hover:bg-gray-50 transition duration-200 cursor-pointer shadow-xs"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
        <div>
          <h2 className="font-bold text-xl text-gray-800">Order Details</h2>
          <p className="text-xs text-gray-400 font-mono">Job #{idNumber}</p>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center py-16">
          <SpinnerLoading />
        </div>
      )}

      {error && (
        <div className="py-8">
          <ErrorText message={error.message} />
        </div>
      )}

      {!isLoading && !error && !order && (
        <div className="py-8 text-center">
          <ErrorText message="Order not found" />
        </div>
      )}

      {!isLoading && !error && order && (
        <div className="space-y-6">
          {/* Main Info Card */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Order Status
                </p>
                <div className="mt-1.5">{getStatusBadge(order.status)}</div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Created Date
                </p>
                <p className="text-sm font-medium text-gray-700 mt-1">
                  {new Date(order.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {/* Client Info */}
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">
                Client Information
              </p>
              <div className="flex items-center gap-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-105">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center font-bold text-indigo-600">
                  C
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-850">
                    Customer #{order.customerId}
                  </p>
                  <p className="text-xs text-gray-400">Registered Client</p>
                </div>
              </div>
            </div>

            {/* Map/Route Section */}
            <div className="space-y-4">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                Delivery Route
              </p>
              <div className="relative pl-8 space-y-6 before:absolute before:left-3 before:top-2.5 before:bottom-2.5 before:w-[2px] before:bg-dashed before:border-l-2 before:border-gray-200">
                <div className="relative">
                  <span className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white ring-2 ring-blue-100"></span>
                  <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    Pickup Address
                  </h4>
                  <p className="text-sm text-gray-800 font-semibold mt-1">
                    {order.pickup}
                  </p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white ring-2 ring-emerald-100"></span>
                  <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    Drop-off Destination
                  </h4>
                  <p className="text-sm text-gray-800 font-semibold mt-1">
                    {order.destination}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Box */}
          <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-bold text-gray-800">Job Action Needed</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Update status as you proceed with this trip.
              </p>
            </div>

            <div className="w-full sm:w-auto">
              {order.status === "CREATED" && (
                <button
                  onClick={handleAccept}
                  disabled={isPending}
                  className="w-full sm:w-auto px-6 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl transition duration-200 disabled:opacity-50 cursor-pointer shadow-md shadow-indigo-150"
                >
                  {isPending ? "Accepting..." : "Accept Job"}
                </button>
              )}

              {order.status === "PROCESS" && (
                <button
                  onClick={handleComplete}
                  disabled={isPending}
                  className="w-full sm:w-auto px-6 py-3 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-2xl transition duration-200 disabled:opacity-50 cursor-pointer shadow-md shadow-emerald-150"
                >
                  {isPending ? "Completing..." : "Complete Delivery"}
                </button>
              )}

              {order.status === "COMPLETED" && (
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2.5 border border-emerald-100 rounded-2xl">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Delivery Completed
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
