import * as yup from "yup";

export const CreateUserSchema = yup.object({
  name: yup.string().required("Name is required"),

  email: yup.string().email("Invalid email").required("Email is required"),

  password: yup.string().required("Password is required"),

  phone: yup
    .number()
    .test(
      "is-number",
      "Phone number must be a number",
      (value) => typeof value === "number",
    )
    .required("Phone number is required"),

  role: yup
    .mixed<"ADMIN" | "CUSTOMER" | "DRIVER">()
    .oneOf(["ADMIN", "CUSTOMER", "DRIVER"], "Invalid role")
    .required("Role is required"),
});

export const UpdateUserSchema = CreateUserSchema;
