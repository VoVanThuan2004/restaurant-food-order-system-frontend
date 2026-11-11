import { useCallback, useEffect, useRef, useState } from "react";
import type QrScannerType from "qr-scanner";

export type QrScannerStatus =
  | "idle"
  | "starting"
  | "scanning"
  | "success"
  | "error";

const getScannerErrorMessage = (error: unknown, fromFile = false) => {
  if (error instanceof Error) {
    if (error.name === "NotAllowedError") {
      return "Bạn chưa cấp quyền truy cập camera. Hãy cấp quyền rồi thử lại.";
    }

    if (error.name === "NotFoundError") {
      return "Không tìm thấy camera trên thiết bị này.";
    }

    if (error.name === "NotReadableError") {
      return "Camera đang được ứng dụng khác sử dụng. Vui lòng thử lại.";
    }

    if (fromFile && error.message.includes("No QR code found")) {
      return "Không tìm thấy mã QR trong ảnh đã chọn.";
    }

    return error.message || "Không thể quét mã QR.";
  }

  if (typeof error === "string") {
    if (fromFile && error.includes("No QR code found")) {
      return "Không tìm thấy mã QR trong ảnh đã chọn.";
    }

    return error;
  }

  return "Không thể quét mã QR. Vui lòng thử lại.";
};

export const useQrScanner = (onResult: (result: string) => void) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScannerType | null>(null);
  const sessionRef = useRef(0);
  const onResultRef = useRef(onResult);
  const hasResultRef = useRef(false);
  const [status, setStatus] = useState<QrScannerStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  const stopScannerInstance = useCallback(() => {
    sessionRef.current += 1;
    const scanner = scannerRef.current;
    scannerRef.current = null;
    scanner?.destroy();
  }, []);

  useEffect(() => {
    return () => {
      stopScannerInstance();
    };
  }, [stopScannerInstance]);

  const startCamera = useCallback(async () => {
    if (!videoRef.current) return;

    if (!navigator.mediaDevices?.getUserMedia) {
      setError(
        "Trình duyệt không hỗ trợ camera. Vui lòng dùng chức năng tải ảnh QR.",
      );
      setStatus("error");
      return;
    }

    stopScannerInstance();
    const sessionId = ++sessionRef.current;
    hasResultRef.current = false;
    setError(null);
    setStatus("starting");

    let scanner: QrScannerType | null = null;

    try {
      const { default: QrScanner } = await import("qr-scanner");

      if (sessionId !== sessionRef.current || !videoRef.current) return;

      scanner = new QrScanner(
        videoRef.current,
        (result) => {
          if (hasResultRef.current) return;

          hasResultRef.current = true;
          stopScannerInstance();
          setStatus("success");
          onResultRef.current(result.data);
        },
        {
          preferredCamera: "environment",
          maxScansPerSecond: 10,
          highlightScanRegion: false,
          highlightCodeOutline: false,
          returnDetailedScanResult: true,
        },
      );

      scannerRef.current = scanner;
      await scanner.start();

      if (
        sessionId === sessionRef.current &&
        scannerRef.current === scanner &&
        !hasResultRef.current
      ) {
        setStatus("scanning");
      }
    } catch (scanError) {
      if (sessionId !== sessionRef.current) return;

      stopScannerInstance();
      setError(getScannerErrorMessage(scanError));
      setStatus("error");
    }
  }, [stopScannerInstance]);

  const stopCamera = useCallback(() => {
    stopScannerInstance();
    hasResultRef.current = false;
    setError(null);
    setStatus("idle");
  }, [stopScannerInstance]);

  const scanFile = useCallback(
    async (file: File) => {
      stopScannerInstance();
      hasResultRef.current = false;
      setError(null);
      setStatus("starting");

      try {
        const { default: QrScanner } = await import("qr-scanner");
        const result = await QrScanner.scanImage(file, {
          returnDetailedScanResult: true,
        });

        hasResultRef.current = true;
        setStatus("success");
        onResultRef.current(result.data);
      } catch (scanError) {
        setError(getScannerErrorMessage(scanError, true));
        setStatus("error");
      }
    },
    [stopScannerInstance],
  );

  const simulateScan = useCallback(
    (value: string) => {
      stopScannerInstance();
      hasResultRef.current = true;
      setError(null);
      setStatus("success");
      onResultRef.current(value);
    },
    [stopScannerInstance],
  );

  const resetScanner = useCallback(() => {
    stopScannerInstance();
    hasResultRef.current = false;
    setError(null);
    setStatus("idle");
  }, [stopScannerInstance]);

  return {
    videoRef,
    status,
    error,
    startCamera,
    stopCamera,
    scanFile,
    simulateScan,
    resetScanner,
  };
};
