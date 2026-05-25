import { formatDate } from "@/libs/utils/format-date"; //Import the formatDate utility function to format the createdAt date of the user
import { IUser } from "@/types/user.types"; //Import the IUser interface to define the shape of the user object being passed as a prop

// Define the props for the UserDetailCard component, which includes a user object of type IUser
interface IUserCardProps {
  user: IUser;
}

export default function UserDetailCard({ user }: IUserCardProps) { //Destructure the user prop to access its properties within the component
  return (
    <div className="w-full border rounded-lg p-6 bg-white shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">{user.name}</h3> {/* Display the user's name */}
          <p className="text-sm text-gray-500">ID: {user.id}</p> {/* Display the user's ID */}
        </div>

        <span
          className={`px-3 py-1 text-sm rounded-full font-medium ${
            user.role === "ADMIN"
              ? "bg-green-100 text-green-700"
              : user.role === "CUSTOMER"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-700"
          }`} //Display the user's role with different background and text colors based on the role value (e.g., green for ADMIN, blue for CUSTOMER, gray for others)
        >
          {user.role} {/* Display the user's role text within the styled span element */}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Phone Number</p> 
          <p className="font-medium">{user.phone}</p> {/* Display the user's phone number */}
        </div>

        <div>
          <p className="text-gray-500">Email:</p>
          <p className="font-medium">{user.email}</p> {/* Display the user's email */}
        </div>

      </div>

      <div className="border-t pt-4 text-xs text-gray-500 space-y-1">
        <p>Created At: {formatDate(user.createdAt)}</p> {/* Display the user's creation date formatted using the formatDate utility function */}
      </div>
    </div>
  );
}
