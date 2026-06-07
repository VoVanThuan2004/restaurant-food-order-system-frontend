export type DineTableType = {
  _id: string;
  tableName: string;
  quantity: number;
  status: boolean;
};

export type DineTableDTO = {
  tableName: string;
  quantity: number;
};


export type DineTableUpdateDTO = {
  tableName: string;
  quantity: number;
}
