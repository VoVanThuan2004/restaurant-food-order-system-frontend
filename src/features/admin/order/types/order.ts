export type Order = {
  _id: string;
  waiter: string;
  diningTableName: string;
  amountReceived: number;
  changeAmount: number;
  totalPrice: number;
  status: string;
  paymentMethod: string;
  paymentTime: string;
};
