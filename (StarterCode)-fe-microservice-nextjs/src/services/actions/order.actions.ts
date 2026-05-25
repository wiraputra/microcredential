"use server";
import { ICreateOrderRequest, IUpdateOrderRequest, IOrder } from "@/types/order.types";
import { OrderInstance } from "../axios/order-instance";

//TASK 2
//Buatkan actions untuk get order list dengan menggunakan OrderInstance yang sudah dibuat sebelumnya.
export const getOrderList = async () => {
  try {
    const response = await OrderInstance<IOrder[]>({
      method: "GET",
      url: `/orders`,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getOrderById = async (Id: number) => {
  try {
    const response = await OrderInstance<IOrder>({
      method: "GET",
      url: `/orders/${Id}`,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (body: ICreateOrderRequest) => {
  try {
    const response = await OrderInstance<IOrder>({
      method: "POST",
      url: `/orders`,
      data: body,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrder = async ({
  Id,
  body,
}: {
  Id: number;
  body: IUpdateOrderRequest;
}) => {
  try {
    const response = await OrderInstance<IOrder>({
      method: "PUT",
      url: `/orders/${Id}/status`,
      data: body,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteOrder = async (Id: number) => {
  try {
    const response = await OrderInstance<IOrder>({
      method: "DELETE",
      url: `/orders/${Id}`,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
