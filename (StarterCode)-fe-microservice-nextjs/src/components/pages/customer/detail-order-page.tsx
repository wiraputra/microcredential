"use client";
import OrderDetailCard from "@/components/fragments/card/customer/order-detail-card";
import BackButton from "@/components/ui/button/back-button";
import SpinnerLoading from "@/components/ui/loading/spinner-loading"; // Import the SpinnerLoading component to display a loading spinner while fetching order details
import ErrorText from "@/components/ui/text/error-text"; // Import the ErrorText component to display an error message if there is an error fetching order details
import { useGetOrderById } from "@/features/order/use-get-order-by-id"; // Import the useGetOrderById hook to fetch order details based on the order ID from the URL parameters
import { useParams } from "next/navigation"; // Import the useParams hook from Next.js to access the URL parameters, specifically to get the order ID for fetching order details

export default function DetailOrderPage() {
  const { Id } = useParams<{ Id: string }>(); // Use the useParams hook to get the order ID from the URL parameters, and specify the type of the parameter as a string

  const { data, isLoading, error } = useGetOrderById(Number(Id)); // Use the useGetOrderById hook, passing the order ID (converted to a number) as an argument, to fetch the order details and get the data, isLoading state, and error state for managing the UI based on the fetch status

  return (
    <div className="space-y-4 w-full">
      <h2 className="font-bold text-lg">Detail Order</h2>

      <BackButton />

      {isLoading && (
        <div className="text-center">
          <SpinnerLoading />
        </div>
      )} {/* Conditionally render the SpinnerLoading component to display a loading spinner while the order details are being fetched, based on the isLoading state */}

      {error && (
        <div className="text-center">
          <ErrorText message={error.message} />
        </div>
      )} {/* Conditionally render the ErrorText component to display an error message if there is an error fetching order details, based on the error state */}

      {!isLoading && !error && data && (
        <OrderDetailCard order={data} />
      )} {/* Conditionally render the OrderDetailCard component to display the order details if the data is successfully fetched and there are no loading or error states, passing the fetched order data as a prop to the OrderDetailCard component */}
    </div>
  );
}
