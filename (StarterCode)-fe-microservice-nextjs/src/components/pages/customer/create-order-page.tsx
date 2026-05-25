"use client";
import CreateOrderForm from "@/components/fragments/form/customer/create-order-form";
import BackButton from "@/components/ui/button/back-button";

export default function CreateUserPage() {
  return (
    <div className="space-y-4 w-full">
      <h2 className="font-bold text-lg">Create Order</h2>

      <BackButton />

      <CreateOrderForm />
    </div>
  );
}
