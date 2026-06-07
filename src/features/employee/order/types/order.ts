export interface Order {
  _id: string;
  paymentTime: string;
  paymentMethod: string;
  status: string;
  amountReceived: number;
  changeAmount: number;
  totalPrice: number;
  waiter: string;
  fullName: string;
  diningTableName: string;
}

export interface OrdersResponse {
  status: string;
  code: number;
  message: string;
  data: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}