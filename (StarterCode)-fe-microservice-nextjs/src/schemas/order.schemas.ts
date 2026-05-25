import * as yup from "yup";

export const CreateOrderSchema = yup.object({
  customerId: yup.number().required("Customer ID is required"),

  pickup: yup.string().required("Pickup location is required"),

  destination: yup.string().required("Destination is required"),

});

export const UpdateOrderSchema = yup.object({
  status: yup
    .mixed<"CREATED" | "PROCESS" | "COMPLETED">()
    .oneOf(["CREATED", "PROCESS", "COMPLETED"], "Invalid status")
    .required("Status is required"),
});

