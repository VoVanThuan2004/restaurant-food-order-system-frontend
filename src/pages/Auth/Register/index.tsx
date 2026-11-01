import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../../hooks/auth/useRegister";
import type { CustomerRegisterRequest } from "../../../types/auth.type";
import RegisterForm from "./RegisterForm";
import { ArrowLeft } from "lucide-react";

export const RegisterPage = () => {
  const { register, loading, error } = useRegister();
  const navigate = useNavigate();

  const onSubmit = async (payload: CustomerRegisterRequest) => {
    const res = await register(payload);

    if (!res) {
      return;
    }

    sessionStorage.setItem("pendingVerifyEmail", payload.email);
    message.success(
      res.message ||
        "Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản",
    );
    navigate("/verify-email", { state: { email: payload.email } });
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col">
      {/* Nút quay trở về */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="mb-3 flex w-fit items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-red-500 cursor-pointer"
      >
        <ArrowLeft size={18} />
        Quay trở về
      </button>

      <RegisterForm onSubmit={onSubmit} loading={loading} error={error} />
    </div>
  );
};
