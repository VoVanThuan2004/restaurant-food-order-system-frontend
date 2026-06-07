export type DiningTableResponse = {
  diningTableId: string;
  name: string;
  capacity: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TableStatus = null | true | false;

export type DiningTableRequest = {
  name: string;
  capacity: number;
}
