export type ApiResponse<T = any> = {
  status: "success" | "error";
  code: number;
  message: string;
  data?: T;
};