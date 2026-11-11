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
};

export type QrCodeResponse = {
  diningTableId: string;
  tableName: string;
  qrCode: string;
  qrUrl: string;
  qrGeneratedAt: string;
};
