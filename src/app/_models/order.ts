import { OrderItem } from "./OrderItem";

export interface Order {
    CustomerName: string;
    OrderItems: OrderItem[];
    TargetDay: string;
    TargetDate: string;
  }
  
