"use client";

import { useState } from "react";
import DriverOrderCard from "@/components/fragments/card/driver/driver-order-card";
import SpinnerLoading from "@/components/ui/loading/spinner-loading";
import ErrorText from "@/components/ui/text/error-text";
import { useGetOrderList } from "@/features/order/use-get-order-list";
import Pagination from "@/components/ui/pagination/pagination";

type TFilterStatus = "ALL" | "CREATED" | "PROCESS" | "COMPLETED";

export default function ListDriverOrderPage() {
  const { data: orders, isLoading, error } = useGetOrderList();
  const [filter, setFilter] = useState<TFilterStatus>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Calculate statistics
  const stats = {
    total: orders?.length || 0,
    created: orders?.filter((o) => o.status === "CREATED").length || 0,
    process: orders?.filter((o) => o.status === "PROCESS").length || 0,
    completed: orders?.filter((o) => o.status === "COMPLETED").length || 0,
  };

  // Filter orders based on active tab
  const filteredOrders = orders?.filter((order) => {
    if (filter === "ALL") return true;
    return order.status === filter;
  });

  const totalPages = filteredOrders ? Math.ceil(filteredOrders.length / pageSize) : 0;
  const paginatedOrders = filteredOrders
    ? filteredOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

  return (
    <div className="space-y-6 w-full px-2 py-4">
      {/* Header Row */}
      <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
        <h2 className="font-bold text-2xl text-gray-800 tracking-tight">
          Order Dashboard
        </h2>
        <p className="text-sm text-gray-400 mt-0.5">
          Manage your jobs and deliveries
        </p>
      </div>

      {/* Stats Cards Section */}
      {!isLoading && !error && orders && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            onClick={() => {
              setFilter("ALL");
              setCurrentPage(1);
            }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              filter === "ALL"
                ? "bg-indigo-50 border-indigo-200 shadow-xs"
                : "bg-white border-gray-100 hover:border-gray-200"
            }`}
          >
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
              All Jobs
            </p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{stats.total}</p>
          </div>

          <div
            onClick={() => {
              setFilter("CREATED");
              setCurrentPage(1);
            }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              filter === "CREATED"
                ? "bg-amber-50/60 border-amber-200 shadow-xs"
                : "bg-white border-gray-100 hover:border-gray-200"
            }`}
          >
            <p className="text-xs text-amber-500 font-semibold uppercase tracking-wider">
              New Requests
            </p>
            <p className="text-2xl font-bold text-amber-700 mt-1">
              {stats.created}
            </p>
          </div>

          <div
            onClick={() => {
              setFilter("PROCESS");
              setCurrentPage(1);
            }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              filter === "PROCESS"
                ? "bg-blue-50/60 border-blue-200 shadow-xs"
                : "bg-white border-gray-100 hover:border-gray-200"
            }`}
          >
            <p className="text-xs text-blue-500 font-semibold uppercase tracking-wider">
              On Process
            </p>
            <p className="text-2xl font-bold text-blue-700 mt-1">
              {stats.process}
            </p>
          </div>

          <div
            onClick={() => {
              setFilter("COMPLETED");
              setCurrentPage(1);
            }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              filter === "COMPLETED"
                ? "bg-emerald-50/60 border-emerald-200 shadow-xs"
                : "bg-white border-gray-100 hover:border-gray-200"
            }`}
          >
            <p className="text-xs text-emerald-500 font-semibold uppercase tracking-wider">
              Completed
            </p>
            <p className="text-2xl font-bold text-emerald-700 mt-1">
              {stats.completed}
            </p>
          </div>
        </div>
      )}

      {/* Tabs Filter (Horizontal Scrollable on Mobile) */}
      <div className="flex gap-2 border-b border-gray-100 pb-1 overflow-x-auto scrollbar-none">
        {(["ALL", "CREATED", "PROCESS", "COMPLETED"] as TFilterStatus[]).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setFilter(tab);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
              filter === tab
                ? "bg-gray-800 text-white shadow-xs"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-100/50"
            }`}
          >
            {tab === "ALL" && "All Orders"}
            {tab === "CREATED" && "New Requests"}
            {tab === "PROCESS" && "On Process"}
            {tab === "COMPLETED" && "Completed"}
          </button>
        ))}
      </div>

      {/* Main List Area */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <SpinnerLoading />
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <ErrorText message={error.message} />
        </div>
      )}

      {!isLoading && !error && paginatedOrders.length === 0 && (
        <div className="bg-gray-50 rounded-2xl border border-gray-100 border-dashed text-center py-16 px-4">
          <svg
            className="w-12 h-12 text-gray-300 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <p className="text-gray-500 font-semibold">No orders found</p>
          <p className="text-gray-400 text-xs mt-1">
            Try choosing a different status filter above.
          </p>
        </div>
      )}

      {!isLoading && !error && paginatedOrders.length > 0 && (
        <div className="space-y-4">
          {paginatedOrders.map((order) => (
            <DriverOrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

      {/* Pagination Footer */}
      {!isLoading && !error && filteredOrders && filteredOrders.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
