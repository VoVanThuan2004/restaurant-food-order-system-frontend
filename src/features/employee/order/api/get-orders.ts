import { http } from "../../../../app/api/http";
// import type { OrdersResponse } from "../types/order";

// const mockOrders = [
//   {
//     _id: "65f1a1b2c3d4e5f001",
//     paymentTime: "2026-03-06T10:20:00.000Z",
//     paymentMethod: "CASH",
//     status: "PAID",
//     amountReceived: 500000,
//     changeAmount: 20000,
//     totalPrice: 480000,
//     waiter: "Nguyễn Văn A",
//     fullName: "Trần Minh Khôi",
//     diningTableName: "Bàn 01",
//   },
//   {
//     _id: "65f1a1b2c3d4e5f002",
//     paymentTime: "2026-03-06T10:15:00.000Z",
//     paymentMethod: "VNPAY",
//     status: "PAID",
//     amountReceived: 300000,
//     changeAmount: 0,
//     totalPrice: 300000,
//     waiter: "Nguyễn Văn B",
//     fullName: "Lê Hoàng Nam",
//     diningTableName: "Bàn 02",
//   },
//   {
//     _id: "65f1a1b2c3d4e5f003",
//     paymentTime: "2026-03-06T10:10:00.000Z",
//     paymentMethod: "CASH",
//     status: "PAID",
//     amountReceived: 200000,
//     changeAmount: 10000,
//     totalPrice: 190000,
//     waiter: "Nguyễn Văn A",
//     fullName: "Phạm Thị Lan",
//     diningTableName: "Bàn 03",
//   },
//   {
//     _id: "65f1a1b2c3d4e5f003",
//     paymentTime: "2026-03-06T10:10:00.000Z",
//     paymentMethod: "CASH",
//     status: "PAID",
//     amountReceived: 200000,
//     changeAmount: 10000,
//     totalPrice: 190000,
//     waiter: "Nguyễn Văn A",
//     fullName: "Phạm Thị Lan",
//     diningTableName: "Bàn 03",
//   },
//   {
//     _id: "65f1a1b2c3d4e5f003",
//     paymentTime: "2026-03-06T10:10:00.000Z",
//     paymentMethod: "CASH",
//     status: "PAID",
//     amountReceived: 200000,
//     changeAmount: 10000,
//     totalPrice: 190000,
//     waiter: "Nguyễn Văn A",
//     fullName: "Phạm Thị Lan",
//     diningTableName: "Bàn 03",
//   },
// ];

// export const getOrdersApi = async (
//   page: number,
//   limit = 2,
// ): Promise<OrdersResponse> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const start = (page - 1) * limit;
//       const end = start + limit;

//       const paginatedData = mockOrders.slice(start, end);

//       resolve({
//         status: "success",
//         code: 200,
//         message: "Lấy danh sách đơn hàng thành công",
//         data: paginatedData,
//         pagination: {
//           page,
//           limit,
//           total: mockOrders.length,
//           totalPages: Math.ceil(mockOrders.length / limit),
//         },
//       });
//     }, 500); // giả lập delay network
//   });
// };

export const getOrdersApi = async (page: number, limit: number) => {
  const res = await http.get(`/orders-history?page=${page}&limit=${limit}`);
  return res.data;
};
