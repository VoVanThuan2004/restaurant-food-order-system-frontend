import { useEffect, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import {
  downloadDiningTableQrApi,
  ensureDiningTableQrApi,
  getDiningTableQrApi,
  getDiningTableQrImageApi,
  regenerateDiningTableQrApi,
} from "../../services/dining-table.api";
import { getApiError } from "../../utils/get-api-error";

const qrQueryKey = (diningTableId: string | null) => [
  "diningTableQr",
  diningTableId,
];

export const useDiningTableQr = (
  diningTableId: string | null,
  enabled = true,
) => {
  return useQuery({
    queryKey: qrQueryKey(diningTableId),
    queryFn: () => getDiningTableQrApi(diningTableId as string),
    enabled: Boolean(diningTableId) && enabled,
    retry: false,
    staleTime: 30_000,
  });
};

export const useEnsureDiningTableQr = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (diningTableId: string) =>
      ensureDiningTableQrApi(diningTableId),
    onSuccess: (data, diningTableId) => {
      queryClient.invalidateQueries({ queryKey: qrQueryKey(diningTableId) });
      message.success(data.message || "Tạo mã QR bàn ăn thành công");
    },
    onError: (error) => {
      const apiError = getApiError(error);
      message.error(apiError.message || "Không thể tạo mã QR, vui lòng thử lại");
    },
  });
};

type RegenerateQrVariables = {
  diningTableId: string;
  force?: boolean;
};

export const useRegenerateDiningTableQr = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ diningTableId, force = false }: RegenerateQrVariables) =>
      regenerateDiningTableQrApi(diningTableId, force),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: qrQueryKey(variables.diningTableId),
      });
      message.success(data.message || "Tạo lại mã QR bàn ăn thành công");
    },
    onError: (error) => {
      const apiError = getApiError(error);

      if (apiError.code !== 409) {
        message.error(
          apiError.message || "Không thể tạo lại mã QR, vui lòng thử lại",
        );
      }
    },
  });
};

export const useDownloadDiningTableQr = () => {
  return useMutation({
    mutationFn: (diningTableId: string) =>
      downloadDiningTableQrApi(diningTableId),
    onSuccess: () => {
      message.success("Đã tải ảnh QR");
    },
    onError: (error) => {
      message.error(
        error instanceof Error
          ? error.message
          : "Không thể tải ảnh QR, vui lòng thử lại",
      );
    },
  });
};

export const useDiningTableQrImage = (
  diningTableId: string | null,
  qrVersion?: string,
  enabled = true,
) => {
  const query = useQuery({
    queryKey: ["diningTableQrImage", diningTableId, qrVersion],
    queryFn: () => getDiningTableQrImageApi(diningTableId as string),
    enabled: Boolean(diningTableId && qrVersion) && enabled,
    retry: false,
    staleTime: Infinity,
    gcTime: 0,
  });

  const imageUrl = useMemo(
    () => (query.data ? URL.createObjectURL(query.data) : null),
    [query.data],
  );

  useEffect(() => {
    if (!imageUrl) return;
    return () => URL.revokeObjectURL(imageUrl);
  }, [imageUrl]);

  return {
    imageUrl,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};
