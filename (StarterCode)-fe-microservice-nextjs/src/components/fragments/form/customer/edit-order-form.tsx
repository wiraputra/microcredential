"use client";
import Button from "@/components/ui/button/button";
import SelectInput from "@/components/ui/input/select-input";
import { useUpdateOrder } from "@/features/order/use-update-user";
import { ORDER_STATUS_OPTIONS } from "@/libs/constant/options";
import { IOrder } from "@/types/order.types";

interface IEditOrderFormProps {
  order: IOrder;
}

export default function EditOrderForm({ order }: IEditOrderFormProps) {
  const { formik, isLoading } = useUpdateOrder(order);

  const StatusIcon = (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white space-y-4 w-full max-w-md mx-auto py-2">
      <SelectInput
        label="Order Status"
        name="status"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.status}
        error={formik.errors.status}
        touched={formik.touched.status}
        icon={StatusIcon}
      >
        {ORDER_STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </SelectInput>

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto px-6 py-2.5">
          {isLoading ? "Updating..." : "Update Order"}
        </Button>
      </div>
    </form>
  );
}
