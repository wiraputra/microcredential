export type TOrderStatus = "CREATED" | "PROCESS" | "COMPLETED";

export interface IOrder {
  id: number;
  customerId: number;
  pickup: string;
  destination: string;
  status: TOrderStatus;
  createdAt: string;
}

export interface ICreateOrderRequest {
  customerId: number;
  pickup: string;
  destination: string;
}

export interface IUpdateOrderRequest {
  status: TOrderStatus;
}
