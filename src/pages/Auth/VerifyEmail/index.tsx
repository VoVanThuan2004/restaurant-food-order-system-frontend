import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2, Mail, XCircle } from "lucide-react";
import Button from "../../../components/Button";
import { useVerifyEmail } from "../../../hooks/auth/useVerifyEmail";
import ResendVerificationForm from "./ResendVerificationForm";

const PENDING_EMAIL_KEY = "pendingVerifyEmail";

export const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { status, error, verify } = useVerifyEmail();

  const token = searchParams.get("token")?.trim() ?? "";
  const locationEmail =
    (location.state as { email?: string } | null)?.email ?? "";
  const sessionEmail = sessionStorage.getItem(PENDING_EMAIL_KEY) ?? "";
  const email = locationEmail || sessionEmail;

  useEffect(() => {
    if (token) {
      void verify(token);
    }
  }, [token, verify]);

  const isVerifying = !!token && (status === "idle" || status === "verifying");
  const shouldShowResend =
    !!error &&
    /hết hạn|đã được sử dụng|không hợp lệ|không tồn tại/i.test(error);

  if (isVerifying) {
    return (
      <div className="mx-auto w-full max-w-md rounded-xl bg-white px-6 py-10 text-center shadow-2xl sm:px-8">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-14 w-14 animate-spin text-red-500" />
          <h1 className="text-2xl font-bold">Đang xác thực email</h1>
          <p className="text-[15px] text-gray-500">
            Vui lòng chờ trong giây lát...
          </p>
        </div>
      </div>
    );
  }

  if (token && status === "success") {
    return (
      <div className="mx-auto w-full max-w-md rounded-xl bg-white px-6 py-8 shadow-2xl sm:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
          <h1 className="text-2xl font-bold">Xác thực email thành công</h1>
          <p className="text-[15px] text-gray-500">
            Tài khoản của bạn đã được xác thực. Bạn có thể đăng nhập ngay.
          </p>
          <Button
            type="button"
            fullWidth
            customBg="bg-red-500"
            customHover="hover:bg-red-600"
            customText="text-white"
            size="xl"
            className="mt-2 rounded-xl py-3.5 text-lg font-medium shadow-md"
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </Button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-[14px] font-semibold text-red-500 underline hover:text-red-600"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  if (token && status === "error") {
    return (
      <div className="mx-auto w-full max-w-md rounded-xl bg-white px-6 py-8 shadow-2xl sm:px-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <XCircle className="h-16 w-16 text-red-500" />
          <h1 className="text-2xl font-bold">Xác thực email thất bại</h1>
          <p className="text-[15px] text-gray-500">
            {error || "Đã xảy ra lỗi khi xác thực email."}
          </p>
        </div>

        {shouldShowResend && <ResendVerificationForm defaultEmail={email} />}

        <div className="mt-5">
          <Button
            type="button"
            fullWidth
            variant="secondary"
            size="md"
            className="rounded-xl"
            onClick={() => navigate("/login")}
          >
            Quay về đăng nhập
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-xl bg-white px-6 py-8 shadow-2xl sm:px-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <Mail className="h-16 w-16 text-red-500" />
        <h1 className="text-2xl font-bold">Kiểm tra hộp thư của bạn</h1>
        <p className="text-[15px] text-gray-500">
          {email
            ? `Chúng tôi đã gửi một liên kết xác thực tới ${email}. Vui lòng mở email và nhấn vào liên kết để kích hoạt tài khoản.`
            : "Chúng tôi đã gửi một liên kết xác thực tới email đăng ký. Vui lòng kiểm tra hộp thư để kích hoạt tài khoản."}
        </p>
      </div>

      <ResendVerificationForm defaultEmail={email} />

      <div className="mt-5">
        <Button
          type="button"
          fullWidth
          variant="secondary"
          size="md"
          className="rounded-xl"
          onClick={() => navigate("/login")}
        >
          Quay về đăng nhập
        </Button>
      </div>
    </div>
  );
};
