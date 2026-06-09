import dayjs from "dayjs";
import { http } from "../app/api/http";
import type { ApiResponse } from "../types/api.response";
import type {
  OrderDetail,
  OrderItemRequest,
  OrderPaymentResponse,
  OrderRequest,
  OrderResponse,
} from "../types/order.type";
import type { PageResponse } from "../types/page.response.type";

export const createOrderApi = async (orderRequest: OrderRequest) => {
  const res = await http.post<ApiResponse<string>>("/orders", orderRequest);

  return res.data;
};

export const checkOrderApi = async (orderRequest: OrderRequest) => {
  const queryParams: Record<string, any> = {
    userId: orderRequest.userId,
    diningTableId: orderRequest.diningTableId,
  };

  const res = await http.get<ApiResponse<string>>("/orders/check", {
    params: queryParams,
  });

  return res.data;
};

// Lấy thông tin chi tiết đơn gọi món
export const getOrderDetailApi = async (orderId: string) => {
  const res = await http.get<ApiResponse<OrderDetail>>(`/orders/${orderId}`);
  return res.data;
};

// Xóa món ăn ra khỏi đơn gọi món
export const deleteOrderItemApi = async (orderItemId: string) => {
  const res = await http.delete<ApiResponse>(`/order-items/${orderItemId}`);
  return res.data;
};

// Thêm món ăn vào đơn gọi món
export const addOrderItemApi = async (orderItemRequest: OrderItemRequest) => {
  const res = await http.post<ApiResponse>("/order-items", orderItemRequest);
  return res.data;
};

// Cập nhật số lượng món ăn
type UpdateQuantityProps = {
  orderItemId: string;
  newQuantity: number;
};
export const updateOrderItemQuantity = async (props: UpdateQuantityProps) => {
  const res = await http.put<ApiResponse>(
    `/order-items/${props.orderItemId}/quantity?newQuantity=${props.newQuantity}`,
  );
  return res.data;
};

// Cập nhật ghi chú món ăn
type UpdateNotesProps = {
  orderItemId: string;
  notes: string;
};
export const updateOrderItemNotes = async (props: UpdateNotesProps) => {
  const res = await http.put<ApiResponse>(
    `/order-items/${props.orderItemId}/notes?notes=${encodeURIComponent(props.notes)}`,
  );
  return res.data;
};

// Đặt món ăn
export const placeOrderApi = async (orderId: string) => {
  const res = await http.put<ApiResponse>(`/orders/${orderId}/place`);
  return res.data;
};

// ===== Bếp =====
// Lấy danh sách đơn gọi món cho bếp
export const getChefOrdersApi = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  const res = await http.get<ApiResponse<PageResponse<OrderResponse>>>(
    `/orders/chef?page=${page}&size=${size}`,
  );
  return res.data;
};

// ===== Nhân viên =====
// Lấy danh sách hóa đơn đã thanh toán của nhân viên
export const getStaffOrdersApi = async ({
  staffId,
  page,
  size,
}: {
  staffId: string;
  page: number;
  size: number;
}) => {
  const res = await http.get<ApiResponse<PageResponse<OrderPaymentResponse>>>(
    `/orders/staff?staffId=${staffId}&page=${page}&size=${size}`,
  );
  return res.data;
};

// Lấy tổng số món ăn có trong đơn gọi món
export const getOrderTotalItemsApi = async (orderId: string) => {
  const res = await http.get<ApiResponse>(`/orders/${orderId}/total-items`);
  return res.data;
};

// Lấy danh sách đơn gọi món dành cho admin
type OrderAdminProps = {
  page: number;
  size: number;
  startDate?: string;
  endDate?: string;
  userId?: string;
  status?: boolean;
};

export const getOrdersByAdmin = async (props: OrderAdminProps) => {
  const { page, size, startDate, endDate, userId, status } = props;
  const queryParams: Record<string, any> = {
    page: page,
    size: size,
  };

  if (startDate && endDate) {
    queryParams.startDate = dayjs(startDate).format("YYYY-MM-DD");
    queryParams.endDate = dayjs(endDate).format("YYYY-MM-DD");
  }

  if (userId) {
    queryParams.userId = userId;
  }

  if (status !== undefined) {
    queryParams.status = status;
  }

  const res = await http.get<ApiResponse<PageResponse<OrderResponse>>>(
    `/orders/admin`,
    {
      params: queryParams,
    },
  );
  return res.data;
};


// Lấy thông tin chi tiết đơn gọi món
export const getOrderDetailAdminApi = async (orderId: string) => {
  const res = await http.get<ApiResponse<OrderResponse>>(`/orders/${orderId}`);
  return res.data;
};
