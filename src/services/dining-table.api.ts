import { http } from "../app/api/http";
import type { ApiResponse } from "../types/api.response";
import type {
  DiningTableRequest,
  DiningTableResponse,
  QrCodeResponse,
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
      params: {
        search: "",
        ...queryParams,
      },
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

// Lấy metadata QR hiện tại
export const getDiningTableQrApi = async (diningTableId: string) => {
  const res = await http.get<ApiResponse<QrCodeResponse>>(
    `/dining-tables/${diningTableId}/qr`,
  );
  return res.data;
};

// Tạo QR nếu bàn chưa có
export const ensureDiningTableQrApi = async (diningTableId: string) => {
  const res = await http.post<ApiResponse<QrCodeResponse>>(
    `/dining-tables/${diningTableId}/qr`,
  );
  return res.data;
};

// Tạo lại QR
export const regenerateDiningTableQrApi = async (
  diningTableId: string,
  force = false,
) => {
  const res = await http.post<ApiResponse<QrCodeResponse>>(
    `/dining-tables/${diningTableId}/qr/regenerate`,
    null,
    { params: { force } },
  );
  return res.data;
};

const getDiningTableQrImageBlob = async (
  diningTableId: string,
  download = false,
) => {
  const res = await http.get<Blob>(
    `/dining-tables/${diningTableId}/qr/image`,
    {
      params: download ? { download: true } : undefined,
      responseType: "blob",
      validateStatus: () => true,
    },
  );

  const contentType = res.headers["content-type"] ?? "";

  if (contentType.includes("application/json")) {
    const text = await res.data.text();
    let message = "Không thể lấy ảnh QR";

    try {
      const error = JSON.parse(text) as { message?: string };
      message = error.message || message;
    } catch {
      // Ignore invalid JSON and use the fallback message.
    }

    throw new Error(message);
  }

  if (res.status !== 200) {
    throw new Error("Không thể lấy ảnh QR");
  }

  return res.data;
};

// Lấy ảnh QR dạng blob để tự gắn Authorization
export const getDiningTableQrImageApi = async (diningTableId: string) => {
  return getDiningTableQrImageBlob(diningTableId);
};

// Tải ảnh QR PNG
export const downloadDiningTableQrApi = async (diningTableId: string) => {
  const blob = await getDiningTableQrImageBlob(diningTableId, true);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `qr-${diningTableId}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};
