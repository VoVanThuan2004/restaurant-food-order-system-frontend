import { useEffect } from "react";
import { useLogin } from "../../../hooks/useLogin";
import type { LoginRequest } from "../../../types/auth.type";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";

export const LoginPage = () => {
  const { login, loading, error } = useLogin();
  const user = useAuthStore((state) => state.user);
  const roles = user?.roles || [];

  const navigate = useNavigate();

  useEffect(() => {
    if (roles.includes("ADMIN")) {
      navigate("/admin", { replace: true });
    }

    if (roles.includes("CHEF")) {
      navigate("/chef", { replace: true });
    }

    if (roles.includes("STAFF")) {
      navigate("/dining-tables", { replace: true });
    }
  }, [roles, navigate]);

  const onSubmit = async (data: LoginRequest) => {
    await login(data);
  };

  return (
    <>
      <LoginForm onSubmit={onSubmit} loading={loading} error={error} />
    </>
  );
};
