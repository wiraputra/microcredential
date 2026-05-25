import ListOrderPage from "@/components/pages/customer/list-order-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Order | Order Management",
};

export default function User() {
  return <ListOrderPage />;
}
