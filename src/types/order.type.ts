export type OrderRequest = {
  userId: string;
  diningTableId: string;
};

export type OrderItemVariant = {
  groupId: string;
  groupName: string;
  optionId: string;
  optionName: string;
  priceAdjustment: number;
};

export type OrderItem = {
  orderItemId: string;
  dishId: string;
  dishName: string;
  dishImage: string;
  quantity: number;
  basePrice: number;
  totalPrice: number;
  currentStatus: string;
  notes: string;
  orderItemVariants: OrderItemVariant[];
};

export type OrderDetail = {
  orderId: string;
  diningTableName: string;
  staffName: string;
  totalPrice: number;
  orderItems: OrderItem[];
};

// ====== OrderItem Request ======
export type OrderItemVariantRequest = {
  optionId: string;
};

export type OrderItemRequest = {
  orderId: string;
  dishId: string;
  quantity: number;
  notes: string;
  variants: OrderItemVariantRequest[];
};

// ====== Order Response ======
export type OrderResponse = {
  orderId: string;
  diningTableName: string;
  staffName: string;
  totalPrice: number;
  amountReceived: number;
  changeAmount: number;
  orderItems: OrderItem[];
  status: boolean;
  paymentMethod: string;
  paidAt: string;
};


export type OrderPaymentResponse = {
  orderId: string;
  diningTableName: string;
  staffName: string;
  totalPrice: number;
  amountReceived: number;
  changeAmount: number;
  paymentMethod: string;
  paidAt: string;
}
