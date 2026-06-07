export type MenuType = {
  _id: string;
  name: string;
  price: number;
  image: string;
  status: boolean;
};

export type MenuDTO = {
  orderId: string | null;
  menuId: string;
  quantity: number;
};
