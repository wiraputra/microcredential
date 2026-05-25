"use client";
import EditUserForm from "@/components/fragments/form/admin/edit-user-form";
import BackButton from "@/components/ui/button/back-button";
import SpinnerLoading from "@/components/ui/loading/spinner-loading"; // Import the SpinnerLoading component to display a loading spinner while fetching user details
import ErrorText from "@/components/ui/text/error-text"; // Import the ErrorText component to display an error message if there is an error fetching user details
import { useGetUserById } from "@/features/admin/use-get-user-by-id"; // Import the useGetUserById hook to fetch user details based on the user ID from the URL parameters
import { useParams } from "next/navigation"; // Import the useParams hook from Next.js to access the URL parameters, specifically to get the user ID for fetching user details

export default function EditUserPage() {
  const { Id } = useParams<{ Id: string }>(); // Use the useParams hook to get the user ID from the URL parameters, and specify the type of the parameter as a string

  const { data, isLoading, error } = useGetUserById(Number(Id)); // Use the useGetUserById hook, passing the user ID (converted to a number) as an argument, to fetch the user details and get the data, isLoading state, and error state for managing the UI based on the fetch status

  return (
    <div className="space-y-4 w-full">
      <h2 className="font-bold text-lg">Edit User</h2>

      <BackButton />

      {isLoading && (
        <div className="text-center">
          <SpinnerLoading />
        </div>
      )} {/* Conditionally render the SpinnerLoading component to display a loading spinner while the user details are being fetched, based on the isLoading state */}

      {error && (
        <div className="text-center">
          <ErrorText message={error.message} />
        </div>
      )} {/* Conditionally render the ErrorText component to display an error message if there is an error fetching user details, based on the error state */}

      {!isLoading && !error && data && (
        <EditUserForm user={data} />
      )} {/* Conditionally render the EditUserForm component to display the form for editing user details if the data is successfully fetched and there are no loading or error states, passing the fetched user data as a prop to the EditUserForm component */}
    </div>
  );
}
