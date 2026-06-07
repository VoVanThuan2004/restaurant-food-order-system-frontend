import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = (data: LoginFormData) => {
    alert(`Email: ${data.email} - Password: ${data.password}`);
    reset();
  };

  return (
    <div className="flex flex-col max-w-md w-full mx-auto shadow-2xl rounded-xl bg-white py-8 px-8">
      {/* Title */}
      <div className="flex flex-col items-center gap-1 mb-6">
        <p className="text-3xl font-bold">Welcome Back</p>
        <p className="text-[15px] text-gray-500">
          Please enter your details to sign in
        </p>
      </div>

      <form onSubmit={handleSubmit(onLogin)}>
        {/* Email */}
        <div className="flex flex-col gap-1 mb-4">
          <label className="font-medium">Email address</label>
          <input
            type="email"
            placeholder="name@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email is not valid",
              },
            })}
          />

          {errors.email && (
            <p className="text-red-500 text-[14px]">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1 mb-3">
          <label className="font-medium">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full relative px-4 py-3 border border-gray-300 rounded-xl"
              {...register("password", {
                required: "Please enter your password",
                minLength: {
                  value: 8,
                  message:
                    "Please enter your password at least 8 characters",
                },
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
            <p className="text-red-500 text-[14px]">{errors.password.message}</p>
          )}
        </div>

        {/* Recovery password */}
        <div className="flex justify-end mb-4">
          <Link
            to="/recovery-password"
            className="text-red-500 text-[14px] font-mono"
          >
            Fogot Password?
          </Link>
        </div>

        {/* Sign in */}
        <button type="submit" disabled={isSubmitting} className="bg-red-500 justify-center w-full px-3 py-4 rounded-xl text-white text-xl font-medium cursor-pointer shadow-md mb-4">
          Sign In
        </button>
      </form>

      {/* border */}
      <div className="flex gap-2 items-center mb-5">
        <div className="flex-1 border-t-1 border-gray-300"></div>
        <span className="text-gray-400 text-[15px]">OR CONTINUE WITH</span>
        <div className="flex-1 border-t-1 border-gray-300"></div>
      </div>

      {/* Register */}
      <div className="flex gap-1.5 justify-center">
        <p className="text-gray-500">Don't have an account?</p>
        <Link to="/" className="text-red-500 font-bold">
          Register now
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
