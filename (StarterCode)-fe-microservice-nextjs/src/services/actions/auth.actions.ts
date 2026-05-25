"use server";
import { UserInstance } from "../axios/user-instance";

interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginResponse {
  token: string;
}

export const login = async (body: ILoginRequest) => {
  try {
    const response = await UserInstance<ILoginResponse>({
      method: "POST",
      url: `/login`,
      data: body,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};