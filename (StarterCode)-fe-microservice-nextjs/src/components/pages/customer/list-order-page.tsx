"use client";
import { useState } from "react";
import OrderCard from "@/components/fragments/card/customer/order-card";
import Button from "@/components/ui/button/button";
import SpinnerLoading from "@/components/ui/loading/spinner-loading"; // Import the SpinnerLoading component to display a loading spinner while fetching the order list
import ErrorText from "@/components/ui/text/error-text"; // Import the ErrorText component to display an error message if there is an error fetching the order list
import { useGetOrderList } from "@/features/order/use-get-order-list"; // Import the useGetOrderList hook to fetch the list of orders and get the data, isLoading state, and error state for managing the UI based on the fetch status
import Link from "next/link";
import Pagination from "@/components/ui/pagination/pagination";

export default function ListOrderPage() {
  const { data, isLoading, error } = useGetOrderList(); // Use the useGetOrderList hook to fetch the list of orders and get the data, isLoading state, and error state for managing the UI based on the fetch status
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const totalPages = data ? Math.ceil(data.length / pageSize) : 0;
  const paginatedOrders = data
    ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

  return (
    <div className="space-y-6 w-full px-2 py-4">
      {/* Top Section */}
      <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
        <div>
          <h2 className="font-bold text-2xl text-gray-800 tracking-tight">List Order</h2>
          <p className="text-sm text-gray-400 mt-0.5">Manage and track your delivery orders</p>
        </div>
        <Link href="/customer/create">
          <Button className="bg-blue-500 hover:bg-blue-600 px-5 py-2.5">
            + Create Order
          </Button>
        </Link>
      </div>

      {isLoading && (
        <div className="text-center">
          <SpinnerLoading />
        </div>
      )} {/* Conditionally render the SpinnerLoading component to display a loading spinner while the order list is being fetched, based on the isLoading state */}

      {error && (
        <div className="text-center">
          <ErrorText message={error.message} />
        </div>
      )} {/* Conditionally render the ErrorText component to display an error message if there is an error fetching the order list, based on the error state */}

      {!isLoading && !error && paginatedOrders.length === 0 && (
        <div className="text-center">
          <ErrorText message="Order not found" />
        </div>
      )} {/* Conditionally render the ErrorText component to display an "Order not found" message if the data is successfully fetched but the order list is empty, based on the length of the data array */}

      {!isLoading && !error && paginatedOrders.length > 0 && (
        <div className="space-y-2 w-full">
          {paginatedOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )} {/* Conditionally render the list of OrderCard components to display the order details if the data is successfully fetched and there are no loading or error states, by mapping over the data array and passing each order object as a prop to the OrderCard component */}

      {/* Pagination Controls */}
      {!isLoading && !error && data && data.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
