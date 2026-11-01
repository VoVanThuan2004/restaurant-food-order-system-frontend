import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { message } from "antd";
import Button from "../../../components/Button";
import { useResendVerification } from "../../../hooks/auth/useResendVerification";

const COOLDOWN_SECONDS = 60;
const PENDING_EMAIL_KEY = "pendingVerifyEmail";

const resendSchema = z.object({
  email: z
    .string()
    .min(1, "Vui lòng nhập email")
    .max(100, "Email tối đa 100 ký tự")
    .email("Email không hợp lệ"),
});

type ResendFormValues = z.infer<typeof resendSchema>;

type ResendVerificationFormProps = {
  defaultEmail?: string;
};

const getCooldownKey = (email: string) =>
  `resendVerificationDeadline:${email}`;

const ResendVerificationForm = ({
  defaultEmail,
}: ResendVerificationFormProps) => {
  const sessionEmail = sessionStorage.getItem(PENDING_EMAIL_KEY) ?? "";
  const { loading, error, resend } = useResendVerification();
  const [deadline, setDeadline] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResendFormValues>({
    resolver: zodResolver(resendSchema),
    defaultValues: {
      email: defaultEmail || sessionEmail,
    },
  });

  const emailValue = watch("email");
  const normalizedEmail = emailValue?.trim().toLowerCase() ?? "";

  useEffect(() => {
    if (!normalizedEmail) {
      setDeadline(0);
      setRemaining(0);
      return;
    }

    const savedDeadline = Number(
      localStorage.getItem(getCooldownKey(normalizedEmail)) ?? 0,
    );

    setDeadline(Number.isFinite(savedDeadline) ? savedDeadline : 0);
  }, [normalizedEmail]);

  useEffect(() => {
    if (!normalizedEmail || !deadline) {
      setRemaining(0);
      return;
    }

    if (deadline <= Date.now()) {
      localStorage.removeItem(getCooldownKey(normalizedEmail));
      setDeadline(0);
      setRemaining(0);
      return;
    }

    const updateRemaining = () => {
      const nextRemaining = Math.max(
        0,
        Math.ceil((deadline - Date.now()) / 1000),
      );

      setRemaining(nextRemaining);

      if (nextRemaining === 0) {
        localStorage.removeItem(getCooldownKey(normalizedEmail));
        setDeadline(0);
      }
    };

    updateRemaining();
    const intervalId = window.setInterval(updateRemaining, 1000);

    return () => window.clearInterval(intervalId);
  }, [deadline, normalizedEmail]);

  const onSubmit = async (values: ResendFormValues) => {
    if (loading || remaining > 0) {
      return;
    }

    const email = values.email.trim().toLowerCase();
    const res = await resend(email);

    if (!res) {
      return;
    }

    const nextDeadline = Date.now() + COOLDOWN_SECONDS * 1000;

    sessionStorage.setItem(PENDING_EMAIL_KEY, email);
    localStorage.setItem(getCooldownKey(email), String(nextDeadline));
    setDeadline(nextDeadline);
    setRemaining(COOLDOWN_SECONDS);
    message.success(
      "Nếu email tồn tại và chưa xác thực, hệ thống đã gửi lại email xác thực",
    );
  };

  return (
    <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
      <p className="mb-3 text-[14px] font-medium text-gray-700">
        Chưa nhận được email?
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label className="text-[14px] font-medium" htmlFor="resend-email">
            Email
          </label>
          <input
            id="resend-email"
            type="email"
            autoComplete="email"
            maxLength={100}
            placeholder="tên@email.com"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-[14px] text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {error && <p className="mt-2 text-[14px] text-red-500">{error}</p>}

        <Button
          type="submit"
          fullWidth
          loading={loading}
          disabled={remaining > 0}
          customBg={remaining > 0 ? "bg-gray-400" : "bg-red-500"}
          customHover={remaining === 0 ? "hover:bg-red-600" : ""}
          customText="text-white"
          size="md"
          className="mt-3 rounded-xl font-medium"
        >
          {loading
            ? "Đang gửi..."
            : remaining > 0
              ? `Gửi lại sau ${remaining}s`
              : "Gửi lại email xác thực"}
        </Button>
      </form>
    </div>
  );
};

export default ResendVerificationForm;
