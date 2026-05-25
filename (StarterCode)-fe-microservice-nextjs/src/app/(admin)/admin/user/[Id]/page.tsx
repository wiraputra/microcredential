
import DetailUserPage from "@/components/pages/admin/detail-admin-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail User | User Management",
};

export default function DetailUser() {
  return <DetailUserPage />;
}
