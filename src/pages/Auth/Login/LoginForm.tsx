import { Link, useNavigate } from "react-router-dom";
import {  Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginRequest } from "../../../types/auth.type";
import Button from "../../../components/Button";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z
    .string()
    .min(8, "Vui lòng nhập mật khẩu ít nhất 8 ký tự"),
});

type LoginFormProps = {
  onSubmit: (data: LoginRequest) => Promise<void> | void;
  loading: boolean;
  error?: string | null;
};

const LoginForm = ({ onSubmit, loading, error }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  return (
    <div className="flex flex-col max-w-md w-full mx-auto shadow-2xl rounded-xl bg-white py-8 px-8">
      {/* Title */}
      <div className="flex flex-col items-center gap-1 mb-6">
        <p className="text-3xl font-bold">Chào mừng trở lại</p>
        <p className="text-[15px] text-gray-500">
          Vui lòng nhập thông tin chi tiết để đăng nhập
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="flex flex-col gap-1 mb-4">
          <label className="font-medium">Email</label>
          <input
            type="email"
            placeholder="tên@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-gray-400 focus:ring-1"
            {...register("email", {
              required: "Vui lòng nhập email của bạn",
            })}
          />

          {errors.email && (
            <p className="text-red-500 text-[14px]">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1 mb-3">
          <label className="font-medium">Mật khẩu</label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu của bạn"
              className="w-full relative px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-gray-400 focus:ring-1"
              {...register("password", {
                required: "Vui lòng nhập mật khẩu",
              })}
            />

            <button
              type="button"
              className="absolute inset-y-0 right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff color="gray" /> : <Eye color="gray" />}
            </button>
          </div>

          {/* error */}
          {errors.password && (
            <p className="text-red-500 text-[14px]">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* error  */}
        {error && <p className="text-red-500 text-[14px]">{error}</p>}

        {/* Recovery password */}
        <div className="flex justify-end mb-4">
          <Link
            to="/recovery-password"
            className="text-red-500 text-[14px] font-mono"
          >
            Quên mật khẩu?
          </Link>
        </div>

        {/* Sign in */}
        <Button
          type="submit"
          fullWidth
          loading={loading}
          customBg={loading ? "bg-red-400" : "bg-red-500"}
          customHover={!loading ? "hover:bg-red-600" : ""}
          customText="text-white"
          size="xl"
          className={`
    py-4 rounded-xl text-xl font-medium
    shadow-md transition-all duration-200 cursor-pointer
    ${!loading && "active:scale-[0.98]"}
  `}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
      </form>

      {/* Nút quay trở về trang chủ */}

      <div className="flex items-center justify-center mt-3 cursor-pointer">
        {/* <ArrowLeft size={17} color="red" /> */}
        <p className="text-red-500 text-[16px] font-semibold underline"
          onClick={() => navigate("/")}
        >Quay trở về</p>
      </div>
    </div>
  );
};

export default LoginForm;
