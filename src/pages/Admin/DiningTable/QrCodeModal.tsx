import { useEffect, useState } from "react";
import { Button, message, Modal } from "antd";
import dayjs from "dayjs";
import {
  AlertCircle,
  CalendarDays,
  Check,
  Copy,
  Download,
  ExternalLink,
  Link2,
  Loader2,
  QrCode,
  RefreshCw,
  Sparkles,
  X,
} from "lucide-react";
import type { DiningTableResponse } from "../../../types/dining-table.type";
import {
  useDiningTableQr,
  useDiningTableQrImage,
  useDownloadDiningTableQr,
  useEnsureDiningTableQr,
  useRegenerateDiningTableQr,
} from "../../../hooks/DiningTable/useDiningTableQr";
import { getApiError } from "../../../utils/get-api-error";

type Props = {
  open: boolean;
  onClose: () => void;
  diningTable: DiningTableResponse | null;
};

type CopiedField = "code" | "url" | null;

const QrSkeleton = () => (
  <div className="grid animate-pulse gap-6 md:grid-cols-[300px_1fr]">
    <div className="h-80 rounded-3xl bg-gray-100" />
    <div className="space-y-4">
      <div className="h-36 rounded-2xl bg-gray-100" />
      <div className="h-20 rounded-2xl bg-gray-100" />
      <div className="h-12 rounded-xl bg-gray-100" />
    </div>
  </div>
);

const QrErrorState = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => (
  <div className="flex flex-col items-center justify-center rounded-3xl border border-red-100 bg-red-50/60 px-6 py-14 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-500">
      <AlertCircle size={28} />
    </div>
    <h3 className="text-lg font-semibold text-gray-900">
      Không thể tải mã QR
    </h3>
    <p className="mt-2 max-w-md text-sm text-gray-600">{message}</p>
    <Button className="mt-5" onClick={onRetry}>
      Thử lại
    </Button>
  </div>
);

const QrEmptyState = ({
  tableName,
  loading,
  onCreate,
}: {
  tableName: string;
  loading: boolean;
  onCreate: () => void;
}) => (
  <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-blue-200 bg-linear-to-br from-blue-50/80 via-white to-indigo-50/80 px-6 py-14 text-center">
    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-200">
      <QrCode size={38} />
    </div>
    <h3 className="text-xl font-semibold text-gray-900">
      Bàn ăn chưa có mã QR
    </h3>
    <p className="mt-2 max-w-md text-sm leading-6 text-gray-600">
      Tạo mã QR cho <span className="font-medium text-gray-900">{tableName}</span>{" "}
      để khách có thể quét và mở trang gọi món.
    </p>
    <Button
      type="primary"
      size="large"
      icon={<Sparkles size={18} />}
      loading={loading}
      onClick={onCreate}
      className="mt-6"
    >
      Tạo mã QR
    </Button>
  </div>
);

const QrImagePanel = ({
  imageUrl,
  isLoading,
  isError,
  onRetry,
}: {
  imageUrl: string | null;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}) => {
  if (isLoading) {
    return (
      <div className="flex aspect-square w-full items-center justify-center">
        <Loader2 size={36} className="animate-spin text-blue-500" />
      </div>
    );
  }

  if (isError || !imageUrl) {
    return (
      <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 text-center">
        <AlertCircle size={32} className="text-red-400" />
        <p className="text-sm text-gray-600">Không tải được ảnh QR</p>
        <Button size="small" onClick={onRetry}>
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt="Mã QR bàn ăn"
      className="aspect-square w-full rounded-2xl object-contain"
    />
  );
};

export const QrCodeModal = ({ open, onClose, diningTable }: Props) => {
  const [copiedField, setCopiedField] = useState<CopiedField>(null);
  const diningTableId = diningTable?.diningTableId ?? null;

  const qrQuery = useDiningTableQr(diningTableId, open);
  const qr = qrQuery.data?.data;
  const qrError = qrQuery.isError ? getApiError(qrQuery.error) : null;
  const isMissingQr =
    qrError?.code === 404 || (qrQuery.isSuccess && !qr);

  const imageQuery = useDiningTableQrImage(
    diningTableId,
    qr ? `${qr.qrCode}-${qr.qrGeneratedAt}` : undefined,
    open && Boolean(qr),
  );

  const ensureMutation = useEnsureDiningTableQr();
  const regenerateMutation = useRegenerateDiningTableQr();
  const downloadMutation = useDownloadDiningTableQr();

  const qrStatusText = qr
    ? "Đã có mã QR"
    : isMissingQr
      ? "Chưa có mã QR"
      : qrError
        ? "Không tải được"
        : "Đang kiểm tra";

  const qrStatusDot = qr
    ? "bg-emerald-300"
    : isMissingQr
      ? "bg-amber-300"
      : qrError
        ? "bg-red-300"
        : "bg-white/70";

  useEffect(() => {
    if (!copiedField) return;

    const timer = window.setTimeout(() => setCopiedField(null), 1800);
    return () => window.clearTimeout(timer);
  }, [copiedField]);

  const handleClose = () => {
    setCopiedField(null);
    onClose();
  };

  const handleCopy = async (value: string, field: Exclude<CopiedField, null>) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      message.success("Đã sao chép");
    } catch {
      message.error("Không thể sao chép, vui lòng thử lại");
    }
  };

  const handleEnsureQr = () => {
    if (!diningTableId) return;
    ensureMutation.mutate(diningTableId);
  };

  const handleDownload = () => {
    if (!diningTableId) return;
    downloadMutation.mutate(diningTableId);
  };

  const handleOpenQr = () => {
    if (!qr?.qrUrl) return;
    window.open(qr.qrUrl, "_blank", "noopener,noreferrer");
  };

  const handleRegenerate = (force = false) => {
    if (!diningTableId) return;

    Modal.confirm({
      title: force ? "Bàn đang có phiên mở" : "Tạo lại mã QR?",
      content: force
        ? "Bàn ăn đang có khách. Tạo lại QR sẽ làm mã cũ mất hiệu lực ngay. Bạn vẫn muốn tiếp tục?"
        : "Mã QR hiện tại sẽ mất hiệu lực ngay. Khách đang dùng mã cũ sẽ không thể tiếp tục quét mã này.",
      okText: force ? "Vẫn tạo lại" : "Tạo lại QR",
      cancelText: "Hủy",
      centered: true,
      okButtonProps: { danger: true },
      onOk: () => {
        regenerateMutation.mutate(
          { diningTableId, force },
          {
            onError: (error) => {
              if (!force && getApiError(error).code === 409) {
                handleRegenerate(true);
              }
            },
          },
        );
      },
    });
  };

  const renderContent = () => {
    if (qrQuery.isLoading) {
      return <QrSkeleton />;
    }

    if (qrError && !isMissingQr) {
      return (
        <QrErrorState
          message={qrError.message || "Có lỗi xảy ra. Vui lòng thử lại."}
          onRetry={() => qrQuery.refetch()}
        />
      );
    }

    if (isMissingQr || !qr) {
      return (
        <QrEmptyState
          tableName={diningTable?.name || "bàn ăn này"}
          loading={ensureMutation.isPending}
          onCreate={handleEnsureQr}
        />
      );
    }

    return (
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div className="rounded-3xl border border-blue-100 bg-linear-to-br from-slate-50 via-white to-blue-50 p-5">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <QrImagePanel
              imageUrl={imageQuery.imageUrl}
              isLoading={imageQuery.isLoading}
              isError={imageQuery.isError}
              onRetry={() => imageQuery.refetch()}
            />
          </div>

          <div className="mt-4 space-y-2">
            <Button
              type="primary"
              size="large"
              block
              icon={<Download size={17} />}
              loading={downloadMutation.isPending}
              onClick={handleDownload}
            >
              Tải ảnh PNG
            </Button>
            <Button
              size="large"
              block
              icon={<ExternalLink size={17} />}
              onClick={handleOpenQr}
            >
              Mở link gọi món
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Mã QR
                </p>
                <p className="mt-1 break-all font-mono text-lg font-semibold text-gray-900">
                  {qr.qrCode}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(qr.qrCode, "code")}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-blue-50 hover:text-blue-600"
                title="Sao chép mã QR"
              >
                {copiedField === "code" ? (
                  <Check size={17} className="text-green-600" />
                ) : (
                  <Copy size={17} />
                )}
              </button>
            </div>

            <div className="my-4 h-px bg-gray-100" />

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                <Link2 size={17} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Link gọi món
                </p>
                <p className="mt-1 break-all text-sm leading-6 text-gray-700">
                  {qr.qrUrl}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(qr.qrUrl, "url")}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-blue-50 hover:text-blue-600"
                title="Sao chép link QR"
              >
                {copiedField === "url" ? (
                  <Check size={17} className="text-green-600" />
                ) : (
                  <Copy size={17} />
                )}
              </button>
            </div>

            <div className="my-4 h-px bg-gray-100" />

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
                <CalendarDays size={17} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Ngày tạo
                </p>
                <p className="mt-1 font-medium text-gray-800">
                  {qr.qrGeneratedAt
                    ? dayjs(qr.qrGeneratedAt).format("HH:mm - DD/MM/YYYY")
                    : "--"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-amber-50/80 p-4 text-sm text-amber-800">
            <p className="font-semibold">Lưu ý</p>
            <p className="mt-1 leading-6">
              Khi tạo lại mã, QR cũ sẽ mất hiệu lực ngay. Nếu bàn đang có phiên
              mở, hệ thống sẽ yêu cầu xác nhận trước khi tiếp tục.
            </p>
          </div>

          <Button
            danger
            size="large"
            block
            icon={<RefreshCw size={17} />}
            loading={regenerateMutation.isPending}
            onClick={() => handleRegenerate(false)}
          >
            Tạo lại mã QR
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      centered
      width={880}
      closable={false}
      destroyOnClose
      styles={{ body: { padding: 0 } }}
    >
      <div className="overflow-hidden">
        <div className="relative bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 px-6 py-6 text-white">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
              <QrCode size={26} />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-bold tracking-tight">Mã QR bàn ăn</h2>
              <p className="mt-1 truncate text-sm text-blue-100">
                {diningTable?.name || "Đang tải thông tin bàn ăn"}
              </p>
            </div>
          </div>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/15">
            <span className={`h-1.5 w-1.5 rounded-full ${qrStatusDot}`} />
            {qrStatusText}
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto bg-gray-50/70 p-6">
          {renderContent()}
        </div>
      </div>
    </Modal>
  );
};
