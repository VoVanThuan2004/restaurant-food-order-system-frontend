import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiError } from "../../../../types/api.error";
import { message } from "antd";
import { updateMenuStatusApi } from "../api/update-menu-status";

export const useUpdateMenuStatus = () => {
  return useMutation({
    mutationFn: (menuId: string) => updateMenuStatusApi(menuId),

    onError: (error: AxiosError<ApiError>) => {
      const errMessage = error.response?.data.message;
      message.error(errMessage);
    },
  });
};
