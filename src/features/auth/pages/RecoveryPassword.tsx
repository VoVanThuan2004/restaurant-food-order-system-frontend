import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type Recovery = {
  otp: string;
  password: string;
  confirmPassword: string;
};

const RecoveryPassword = () => {
  const [input, setInput] = useState<Recovery>({
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setConfirmShowPassword] =
    useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="flex flex-col max-w-md w-full mx-auto bg-white rounded-xl shadow-xl py-7 px-8">
      {/* Title */}
      <p className="text-2xl font-bold text-center mb-8">Khôi phục mật khẩu</p>

      {step === 1 && (
        <form>
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="font-medium">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              required
              className="px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>

          {/* error */}
          <div>
            <p className="text-red-500 text-[14px] italic mb-2 mt-1">
              Email không tồn tại
            </p>
          </div>

          {/* Button */}
          <div className="flex justify-center mt-4">
            <button
              className="bg-red-500 text-white px-12 py-3.5 rounded-xl font-bold cursor-pointer shadow-md"
              onClick={() => setStep(step + 1)}
            >
              Gửi mã OTP
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form className="flex flex-col gap-4">
          {/* OTP */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Mã OTP</label>
            <input
              type="text"
              name="otp"
              value={input.otp}
              onChange={handleChange}
              placeholder="Nhập mã OTP"
              required
              className="px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Mật khẩu mới</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={input.password}
                onChange={(e) => handleChange(e)}
                placeholder="Nhập mật khẩu mới"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3"
              >
                {showPassword ? <EyeOff color="gray" /> : <Eye color="gray" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={input.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập mật khẩu mới"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              />

              <button
                type="button"
                onClick={() => setConfirmShowPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3"
              >
                {showConfirmPassword ? (
                  <EyeOff color="gray" />
                ) : (
                  <Eye color="gray" />
                )}
              </button>
            </div>
          </div>

          <button className="bg-red-500 text-white py-4 rounded-xl font-bold cursor-pointer shadow-md">
            Đổi mật khẩu
          </button>
        </form>
      )}
    </div>
  );
};

export default RecoveryPassword;
