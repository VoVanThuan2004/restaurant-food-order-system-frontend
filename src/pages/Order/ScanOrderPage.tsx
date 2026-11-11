import { useMemo, useRef, useState, type ChangeEvent } from "react";
import { QRCode, message } from "antd";
import {
  AlertCircle,
  Camera,
  CameraOff,
  CheckCircle2,
  Download,
  ImageUp,
  QrCode,
  ScanLine,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import Header from "../../components/layouts/landing/Header";
import Footer from "../../components/layouts/landing/Footer";
import BackToTop from "../../components/BackToTop";
import { useQrScanner } from "../../hooks/useQrScanner";

const DEMO_TABLE_CODE = "DEMO_TABLE_01";

export const ScanOrderPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const demoQrValue = useMemo(
    () =>
      new URL(
        `/order?table=${DEMO_TABLE_CODE}`,
        window.location.origin,
      ).toString(),
    [],
  );

  const {
    videoRef,
    status,
    error,
    startCamera,
    stopCamera,
    scanFile,
    simulateScan,
  } = useQrScanner((text) => {
    alert(`Đã quét mã QR:\n${text}`);
  });

  const isScanning = status === "scanning";
  const isCameraBusy = status === "starting" || isScanning;
  const isCameraSupported = Boolean(navigator.mediaDevices?.getUserMedia);
  const isInsecureContext = !window.isSecureContext;

  const statusText =
    status === "starting"
      ? "Đang mở camera..."
      : status === "scanning"
        ? "Đang tìm mã QR..."
        : status === "success"
          ? "Đã quét thành công"
          : status === "error"
            ? "Không thể quét"
            : "Camera chưa bật";

  const cameraButtonLabel = isCameraBusy
    ? "Dừng quét"
    : status === "success" || status === "error"
      ? "Quét lại"
      : "Bật camera";

  const handleCameraButton = () => {
    if (isCameraBusy) {
      stopCamera();
      return;
    }

    void startCamera();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    setIsUploading(true);

    try {
      await scanFile(file);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownloadDemoQr = () => {
    const canvas = qrContainerRef.current?.querySelector("canvas");

    if (!canvas) {
      message.error("Chưa thể tải QR mẫu. Vui lòng thử lại.");
      return;
    }

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `qr-ban-${DEMO_TABLE_CODE.toLowerCase()}.png`;
    link.click();
    message.success("Đã tải QR mẫu");
  };

  return (
    <div className="w-full bg-gradient-to-b from-red-50 via-white to-white">
      <style>{`
        @keyframes qr-scan-line {
          0%, 100% {
            top: 8%;
            opacity: 0.35;
          }
          50% {
            top: 92%;
            opacity: 1;
          }
        }
      `}</style>

      <Header />

      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-1.5 text-sm font-semibold text-red-600 shadow-sm">
            <QrCode size={16} />
            Đặt món bằng QR
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Quét mã QR trên bàn để bắt đầu
          </h1>
          <p className="mt-3 text-gray-600">
            Đưa mã QR vào khung hình hoặc tải ảnh QR lên. Kết quả quét sẽ được
            hiển thị trong hộp thoại.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-red-100/50">
            <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Quét mã QR
                </h2>
                <p className="text-sm text-gray-500">{statusText}</p>
              </div>
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                  status === "success"
                    ? "bg-emerald-50 text-emerald-700"
                    : status === "error"
                      ? "bg-red-50 text-red-600"
                      : isScanning
                        ? "bg-blue-50 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    status === "success"
                      ? "bg-emerald-500"
                      : status === "error"
                        ? "bg-red-500"
                        : isScanning
                          ? "animate-pulse bg-blue-500"
                          : "bg-gray-400"
                  }`}
                />
                {status === "success"
                  ? "Thành công"
                  : status === "error"
                    ? "Có lỗi"
                    : isScanning
                      ? "Đang quét"
                      : "Sẵn sàng"}
              </span>
            </div>

            <div className="p-5 sm:p-6">
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-gray-800 bg-gray-950">
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                    isScanning ? "opacity-100" : "opacity-0"
                  }`}
                />

                {!isScanning && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.16),_transparent_55%)] px-8 text-center">
                    {status === "success" ? (
                      <>
                        <CheckCircle2 className="text-emerald-400" size={54} />
                        <p className="mt-4 font-semibold text-white">
                          Đã đọc mã QR
                        </p>
                        <p className="mt-1 text-sm text-gray-400">
                          Xem kết quả trong hộp thoại vừa hiển thị.
                        </p>
                      </>
                    ) : status === "starting" ? (
                      <>
                        <Camera
                          className="animate-pulse text-red-400"
                          size={54}
                        />
                        <p className="mt-4 font-semibold text-white">
                          Đang mở camera
                        </p>
                        <p className="mt-1 text-sm text-gray-400">
                          Vui lòng cấp quyền camera nếu trình duyệt yêu cầu.
                        </p>
                      </>
                    ) : (
                      <>
                        <CameraOff className="text-gray-500" size={54} />
                        <p className="mt-4 font-semibold text-white">
                          Camera chưa bật
                        </p>
                        <p className="mt-1 max-w-sm text-sm text-gray-400">
                          Bấm “Bật camera” để quét trực tiếp, hoặc tải ảnh QR có
                          sẵn lên.
                        </p>
                      </>
                    )}
                  </div>
                )}

                {isScanning && (
                  <div className="pointer-events-none absolute inset-6">
                    <div className="absolute left-0 top-0 h-12 w-12 rounded-tl-2xl border-l-4 border-t-4 border-red-400" />
                    <div className="absolute right-0 top-0 h-12 w-12 rounded-tr-2xl border-r-4 border-t-4 border-red-400" />
                    <div className="absolute bottom-0 left-0 h-12 w-12 rounded-bl-2xl border-b-4 border-l-4 border-red-400" />
                    <div className="absolute bottom-0 right-0 h-12 w-12 rounded-br-2xl border-b-4 border-r-4 border-red-400" />
                    <div
                      className="absolute inset-x-0 h-0.5 bg-red-400 shadow-[0_0_18px_rgba(248,113,113,0.9)]"
                      style={{ animation: "qr-scan-line 2.4s ease-in-out infinite" }}
                    />
                  </div>
                )}
              </div>

              {isInsecureContext && (
                <div className="mt-4 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  <ShieldAlert className="mt-0.5 shrink-0" size={18} />
                  <p>
                    Camera chỉ hoạt động trên <b>localhost</b> hoặc kết nối{" "}
                    <b>HTTPS</b>. Nếu đang mở bằng HTTP qua LAN, hãy dùng chức
                    năng tải ảnh QR.
                  </p>
                </div>
              )}

              {!isCameraSupported && (
                <div className="mt-4 flex gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <AlertCircle className="mt-0.5 shrink-0" size={18} />
                  <p>
                    Trình duyệt không hỗ trợ camera. Bạn vẫn có thể tải ảnh QR
                    lên để quét.
                  </p>
                </div>
              )}

              {error && (
                <div className="mt-4 flex gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <AlertCircle className="mt-0.5 shrink-0" size={18} />
                  <p>{error}</p>
                </div>
              )}

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleCameraButton}
                  disabled={!isCameraSupported || isUploading}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {isCameraBusy ? <CameraOff size={19} /> : <Camera size={19} />}
                  {cameraButtonLabel}
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading || isCameraBusy}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ImageUp size={19} />
                  {isUploading ? "Đang đọc ảnh..." : "Tải ảnh QR"}
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </section>

          <section className="flex flex-col rounded-3xl border border-gray-200 bg-white p-5 shadow-xl shadow-red-100/50 sm:p-6">
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <Sparkles size={20} />
              </span>
              <div>
                <h2 className="text-lg font-bold text-gray-900">QR bàn test</h2>
                <p className="text-sm text-gray-500">
                  Dành cho interviewer kiểm thử
                </p>
              </div>
            </div>

            <div
              ref={qrContainerRef}
              className="mx-auto mt-6 flex w-fit rounded-3xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <QRCode
                type="canvas"
                value={demoQrValue}
                size={220}
                bordered={false}
                bgColor="#ffffff"
                fgColor="#111827"
              />
            </div>

            <div className="mt-5 rounded-2xl bg-gray-50 px-4 py-3 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Mã bàn
              </p>
              <p className="mt-1 font-mono text-lg font-bold text-gray-900">
                {DEMO_TABLE_CODE}
              </p>
              <p className="mt-2 break-all text-xs text-gray-500">
                {demoQrValue}
              </p>
            </div>

            <div className="mt-5 grid gap-3">
              <button
                type="button"
                onClick={handleDownloadDemoQr}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
              >
                <Download size={19} />
                Tải QR mẫu
              </button>

              <button
                type="button"
                onClick={() => simulateScan(demoQrValue)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-100"
              >
                <ScanLine size={19} />
                Dùng mã mẫu
              </button>
            </div>

            <p className="mt-5 text-center text-xs leading-relaxed text-gray-500">
              Camera cần quyền truy cập. Trên thiết bị không có camera, hãy tải
              ảnh QR mẫu xuống và dùng chức năng “Tải ảnh QR”.
            </p>
          </section>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};
