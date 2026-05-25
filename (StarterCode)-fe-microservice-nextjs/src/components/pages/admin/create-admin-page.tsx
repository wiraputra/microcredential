"use client";
import CreateUserForm from "@/components/fragments/form/admin/create-user-form";
import BackButton from "@/components/ui/button/back-button";

export default function CreateUserPage() {
  return (
    <div className="space-y-4 w-full">
      <h2 className="font-bold text-lg">Create User</h2>

      <BackButton />

      <CreateUserForm />
    </div>
  );
}
