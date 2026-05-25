

import DetailOrderPage from "@/components/pages/customer/detail-order-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Order | Order Management",
};

export default function DetailOrder() {
  return <DetailOrderPage />;
}
