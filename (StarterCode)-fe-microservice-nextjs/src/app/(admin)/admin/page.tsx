import ListUserPage from "@/components/pages/admin/list-admin-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "List User | User Management",
};

export default function User() {
  return <ListUserPage />;
}
