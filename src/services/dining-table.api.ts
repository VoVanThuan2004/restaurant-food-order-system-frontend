import { http } from "../app/api/http";
import type { ApiResponse } from "../types/api.response";
import type {
  DiningTableRequest,
  DiningTableResponse,
  TableStatus,
} from "../types/dining-table.type";
import type { PageResponse } from "../types/page.response.type";

export const getAllDiningTables = async (status: TableStatus) => {
  const queryParams: Record<string, TableStatus> = {};

  if (status !== null) {
    queryParams.status = status;
  }

  const res = await http.get<ApiResponse<PageResponse<DiningTableResponse>>>(
    `/dining-tables`,
    {
      params: queryParams,
    },
  );
  return res.data;
};

// Cập nhật vị trí bàn ăn
export const updateDiningTablePositionApi = async ({
  diningTableId,
  previousTableId,
  nextTableId,
}: {
  diningTableId: string;
  previousTableId: string | null;
  nextTableId: string | null;
}) => {
  const res = await http.patch<ApiResponse<DiningTableResponse[]>>(
    `/dining-tables/${diningTableId}/position`,
    {
      previousTableId,
      nextTableId,
    },
  );
  return res.data;
};

// Thêm bàn ăn mới
export const addDiningTableApi = async (diningTable: DiningTableRequest) => {
  const res = await http.post<ApiResponse>("/dining-tables", diningTable);
  return res.data;
};

// Cập nhật thông tin bàn ăn
export const updateDiningTableApi = async ({
  diningTableId,
  diningTable,
}: {
  diningTableId: string;
  diningTable: DiningTableRequest;
}) => {
  const res = await http.put(`/dining-tables/${diningTableId}`, diningTable);
  return res.data;
};
