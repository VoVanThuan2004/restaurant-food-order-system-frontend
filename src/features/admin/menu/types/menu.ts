import type { UploadFile } from "antd";

export type Menu = {
  _id: string;
  categoryId: string;
  name: string;
  image: string;
  price: number;
  status: boolean;
};

export type MenuDTO = {
  categoryId: string;
  name: string;
  price: number;
  image: UploadFile[];
};

export type MenuUpdateDTO = {
  _id: string;
  categoryId: string;
  name: string;
  price: number;
  image: UploadFile[];
};
