import { useForm } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
}

const TestPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (data: LoginFormData) => {
    alert(`Email: ${data.email} - Password: ${data.password}`);
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <label>Email</label>
          <input
            type="email"
            className="border border-blue-400 w-full"
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email không hợp lệ",
              },
            })}
          />

          {errors.email && (
            <p className="text-red-500 font-medium">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            className="border border-blue-400 w-full"
            {...register("password", {
              minLength: {
                value: 8,
                message: "Mật khẩu phải từ 6 ký tự trở lên",
              },
              required: "Please enter your password",
            })}
          />

          {errors.password && (
            <p className="text-red-500 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl text-white bg-blue-600 cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "...Loading" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestPage;
