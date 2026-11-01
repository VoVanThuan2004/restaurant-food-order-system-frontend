import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Eye, EyeOff } from "lucide-react";
import Button from "../../../components/Button";
import type { CustomerRegisterRequest } from "../../../types/auth.type";

const phoneRegex = /^(0|\+84)[0-9]{9}$/;

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Vui lòng nhập email")
      .max(100, "Email tối đa 100 ký tự")
      .email("Email không hợp lệ"),
    password: z
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .max(50, "Mật khẩu tối đa 50 ký tự"),
    confirmPassword: z
      .string()
      .min(8, "Vui lòng xác nhận mật khẩu")
      .max(50, "Mật khẩu tối đa 50 ký tự"),
    fullName: z
      .string()
      .trim()
      .min(1, "Vui lòng nhập họ tên")
      .max(100, "Họ tên tối đa 100 ký tự"),
    phoneNumber: z
      .string()
      .trim()
      .regex(phoneRegex, "Số điện thoại không hợp lệ"),
    gender: z.string().min(1, "Vui lòng chọn giới tính"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

type RegisterFormProps = {
  onSubmit: (data: CustomerRegisterRequest) => Promise<void> | void;
  loading: boolean;
  error?: string | null;
};

const inputClassName =
  "w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gray-400";

const errorClassName = "text-[14px] text-red-500";

const RegisterForm = ({ onSubmit, loading, error }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      phoneNumber: "",
      gender: "",
    },
  });

  const emailValue = watch("email");
  const normalizedEmail = emailValue?.trim().toLowerCase() ?? "";
  const isUnverifiedError =
    !!error && error.toLowerCase().includes("chưa xác thực");
  const isDuplicateEmailError =
    !!error && error.toLowerCase().includes("đã được sử dụng");

  const submitForm = (values: RegisterFormValues) => {
    const payload: CustomerRegisterRequest = {
      email: values.email.trim().toLowerCase(),
      password: values.password,
      confirmPassword: values.confirmPassword,
      fullName: values.fullName.trim(),
      phoneNumber: values.phoneNumber.trim(),
    };

    if (values.gender) {
      payload.gender = Number(values.gender);
    }

    return onSubmit(payload);
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col rounded-xl bg-white px-6 py-8 shadow-2xl sm:px-8">
      <div className="mb-6 flex flex-col items-center gap-1 text-center">
        <p className="text-3xl font-bold">Tạo tài khoản</p>
        <p className="text-[15px] text-gray-500">
          Đăng ký để bắt đầu đặt món tại Dexlure
        </p>
      </div>

      <form onSubmit={handleSubmit(submitForm)}>
        <div className="mb-4 flex flex-col gap-1">
          <label className="font-medium" htmlFor="register-email">
            Email
          </label>
          <input
            id="register-email"
            type="email"
            autoComplete="email"
            maxLength={100}
            placeholder="tên@email.com"
            className={inputClassName}
            {...register("email")}
          />
          {errors.email && (
            <p className={errorClassName}>{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4 flex flex-col gap-1">
          <label className="font-medium" htmlFor="register-password">
            Mật khẩu
          </label>
          <div className="relative w-full">
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Từ 8 đến 50 ký tự"
              className={`${inputClassName} pr-12`}
              {...register("password")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPassword ? <EyeOff color="gray" /> : <Eye color="gray" />}
            </button>
          </div>
          {errors.password && (
            <p className={errorClassName}>{errors.password.message}</p>
          )}
        </div>

        <div className="mb-4 flex flex-col gap-1">
          <label className="font-medium" htmlFor="register-confirm-password">
            Xác nhận mật khẩu
          </label>
          <div className="relative w-full">
            <input
              id="register-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Nhập lại mật khẩu"
              className={`${inputClassName} pr-12`}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showConfirmPassword ? (
                <EyeOff color="gray" />
              ) : (
                <Eye color="gray" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className={errorClassName}>{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="mb-4 flex flex-col gap-1">
          <label className="font-medium" htmlFor="register-full-name">
            Họ và tên
          </label>
          <input
            id="register-full-name"
            type="text"
            autoComplete="name"
            maxLength={100}
            placeholder="Nguyễn Văn A"
            className={inputClassName}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className={errorClassName}>{errors.fullName.message}</p>
          )}
        </div>

        <div className="mb-4 flex flex-col gap-1">
          <label className="font-medium" htmlFor="register-phone">
            Số điện thoại
          </label>
          <input
            id="register-phone"
            type="tel"
            autoComplete="tel"
            placeholder="0912345678"
            className={inputClassName}
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p className={errorClassName}>{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <label className="font-medium" htmlFor="register-gender">
            Giới tính
          </label>
          <select
            id="register-gender"
            className={inputClassName}
            {...register("gender")}
          >
            <option value="">Chọn giới tính</option>
            <option value="1">Nam</option>
            <option value="0">Nữ</option>
            <option value="2">Khác</option>
          </select>

          {errors.gender && (
            <p className={errorClassName}>{errors.gender.message}</p>
          )}
        </div>

        {error && (
          <div className="mb-4 flex flex-col gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-[14px] text-red-600">
            <p>{error}</p>

            {isUnverifiedError && (
              <Link
                to="/verify-email"
                state={{ email: normalizedEmail }}
                className="w-fit font-semibold underline hover:text-red-700"
              >
                Gửi lại email xác thực
              </Link>
            )}

            {isDuplicateEmailError && (
              <Link
                to="/login"
                className="w-fit font-semibold underline hover:text-red-700"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        )}

        <Button
          type="submit"
          fullWidth
          loading={loading}
          customBg={loading ? "bg-red-400" : "bg-red-500"}
          customHover={!loading ? "hover:bg-red-600" : ""}
          customText="text-white"
          size="xl"
          className={`
            rounded-xl py-3.5 text-lg font-medium shadow-md transition-all duration-200 cursor-pointer
            ${!loading && "active:scale-[0.98]"}
          `}
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </Button>
      </form>

      <p className="mt-4 text-center text-[14px] text-gray-600">
        Đã có tài khoản?{" "}
        <Link
          to="/login"
          className="font-semibold text-red-500 hover:text-red-600"
        >
          Đăng nhập
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
