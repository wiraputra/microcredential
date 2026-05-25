import CreateOrderPage from "@/components/pages/customer/create-order-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Order | Order Management",
};

export default function CreateOrder() {
  return <CreateOrderPage />;
}
