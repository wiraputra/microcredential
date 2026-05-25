import CreateUserPage from "@/components/pages/admin/create-admin-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create User | User Management",
};

export default function CreateUser() {
  return <CreateUserPage />;
}
