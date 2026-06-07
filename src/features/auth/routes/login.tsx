import { useNavigate } from "react-router-dom";
import LoginForm from "../components/login-form";
import { useLogin } from "../hooks/useLogin";
import type { LoginRequest } from "../types/auth.type";

export const LoginRoute = () => {
  const { login, loading, error } = useLogin();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginRequest) => {
    await login(data);
    navigate("/", { replace: true });
  };


  return (
    <>
      <LoginForm onSubmit={onSubmit} loading={loading} error={error} />
    </>
  );
};
