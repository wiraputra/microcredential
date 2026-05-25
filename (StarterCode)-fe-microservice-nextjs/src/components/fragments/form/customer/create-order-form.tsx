"use client";
import Button from "@/components/ui/button/button";
import TextInput from "@/components/ui/input/text-input";
import SelectInput from "@/components/ui/input/select-input";
import { useCreateOrder } from "@/features/order/use-create-order";
import { useGetUserList } from "@/features/admin/use-get-user-list";

export default function CreateOrderForm() {
  const { formik, isLoading } = useCreateOrder();
  const { data: users, isLoading: isUsersLoading } = useGetUserList();

  const UserIcon = (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const PickupIcon = (
    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const DestinationIcon = (
    <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21v8h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
    </svg>
  );

  // Filter only users with role CUSTOMER
  const customers = users?.filter((user) => user.role === "CUSTOMER") || [];

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white space-y-4 w-full max-w-md mx-auto py-2">
      <SelectInput
        label="Select Customer"
        name="customerId"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.customerId || ""}
        error={formik.errors.customerId}
        touched={formik.touched.customerId}
        disabled={isUsersLoading}
        icon={UserIcon}
      >
        <option value="" disabled>
          {isUsersLoading ? "Loading customers..." : "Choose a customer..."}
        </option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name} (ID: {customer.id})
          </option>
        ))}
      </SelectInput>

      <TextInput
        label="Pickup Address"
        type="text"
        name="pickup"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.pickup}
        error={formik.errors.pickup}
        touched={formik.touched.pickup}
        placeholder="e.g. 123 Main St, Apartment 4B"
        icon={PickupIcon}
      />

      <TextInput
        label="Drop-off Destination"
        type="text"
        name="destination"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.destination}
        error={formik.errors.destination}
        touched={formik.touched.destination}
        placeholder="e.g. Grand City Mall, Tower 2"
        icon={DestinationIcon}
      />

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto px-6 py-2.5">
          {isLoading ? "Creating..." : "Create Order"}
        </Button>
      </div>
    </form>
  );
}
