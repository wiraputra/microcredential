
import EditOrderPage from "@/components/pages/customer/edit-order-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Order | Order Management",
};

export default function EditOrder(
) {
  return <EditOrderPage />;
}
