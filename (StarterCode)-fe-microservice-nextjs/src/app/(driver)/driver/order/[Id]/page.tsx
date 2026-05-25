import DetailDriverOrderPage from "@/components/pages/driver/detail-driver-order-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Driver Order Detail | Dashboard",
};

export default function DriverOrderDetail() {
  return <DetailDriverOrderPage />;
}
