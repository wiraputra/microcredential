
import EditUserPage from "@/components/pages/admin/edit-admin-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit User | User Management",
};

export default function EditUser(
) {
  return <EditUserPage />;
}
