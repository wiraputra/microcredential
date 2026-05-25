export type TUserRole = "ADMIN" | "CUSTOMER" | "DRIVER";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: TUserRole;
  createdAt: string;
}

export interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: TUserRole;
}

export type IUpdateUserRequest = ICreateUserRequest;
