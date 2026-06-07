import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { ChangePasswordDTO } from "../types/auth.type";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type ChangePasswordProps = {
  onChangePassword: (data: ChangePasswordDTO) => Promise<void>;
  loading: boolean;
  error?: string;
};

const changePasswordSchema = z
  .object({
    password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    newPassword: z.string().min(8, "Mật khẩu mới phải có ít nhất 8 ký tự"),
    confirmNewPassword: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Mật khẩu mới và xác nhận không khớp",
    path: ["confirmNewPassword"], // ← Chỉ báo lỗi ở field confirmNewPassword
  });

const ChangePasswordForm = ({
  onChangePassword,
  loading,
  error,
}: ChangePasswordProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    useState<boolean>(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="max-w-md md:max-w-xl w-full bg-white rounded-xl shadow-md mt-5 mx-auto py-5 px-4 md:px-8">
      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold text-center mb-5">Thay đổi mật khẩu</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onChangePassword)}
        className="flex flex-col gap-2"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm">Mật khẩu hiện tại</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Vui lòng nhập mật khẩu hiện tại",
              })}
              className="w-full py-2 pl-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
            />
            {showPassword ? (
              <EyeOff
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <Eye
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>

          {errors.password && (
            <p className="text-red-500 text-[13px] mb-2">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm">Mật khẩu mới</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              {...register("newPassword", {
                required: "Vui lòng nhập mật khẩu mới",
              })}
              className="w-full py-2 pl-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
            />
            {showNewPassword ? (
              <EyeOff
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              />
            ) : (
              <Eye
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              />
            )}
          </div>

          {errors.newPassword && (
            <p className="text-red-500 text-[13px] mb-2">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm">Xác nhận mật khẩu</label>
          <div className="relative">
            <input
              type={showConfirmNewPassword ? "text" : "password"}
              {...register("confirmNewPassword", {
                required: "Vui lòng nhập mật khẩu xác nhận",
              })}
              className="w-full py-2 pl-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
            />
            {showConfirmNewPassword ? (
              <EyeOff
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 right-3 text-gray-500 cursor-pointer"
                onClick={() =>
                  setShowConfirmNewPassword(!showConfirmNewPassword)
                }
              />
            ) : (
              <Eye
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 right-3 text-gray-500 cursor-pointer"
                onClick={() =>
                  setShowConfirmNewPassword(!showConfirmNewPassword)
                }
              />
            )}
          </div>

          {errors.confirmNewPassword && (
            <p className="text-red-500 text-[13px] mb-2">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>

        {/* Hiển thị lỗi */}
        {error && <p className="text-red-500 text-[13px]">{error}</p>}

        <button
          type="submit"
          className="bg-red-500 w-full text-white text-[17px] font-semibold py-3 rounded-md mt-4 shadow-md cursor-pointer"
        >
          Cập nhật
        </button>
      </form>

      

    </div>
  );
};

export default ChangePasswordForm;
