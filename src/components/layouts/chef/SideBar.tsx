import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";
import { logoutApi } from "../../../services/auth.api";
import { getApiError } from "../../../utils/get-api-error";
import { message } from "antd";
import { LogOut } from "lucide-react";
import logo from "../../../assets/logo.png";

const SideBar = () => {
  const navigate = useNavigate();

  const clearSession = useAuthStore((state) => state.clearSession);

  const onLogout = async () => {
    try {
      const res = await logoutApi();

      if (res.status === "success") {
        clearSession();
        navigate('/');
      }
    } catch (error) {
      const apiError = getApiError(error);
      message.error(apiError.message);
    }
  }

  return (
    <div className="p-4 bg-orange-400 h-screen w-65 flex flex-col">
      {/* Logo + Tên nhà hàng */}
      <div className="flex items-center gap-2.5 mb-7">
        <img
          src={logo}
          alt="Dexlure Logo"
          className="h-9 w-auto object-contain bg-white rounded-lg p-1 shadow-md"
        />
        <h1 className="text-xl font-bold text-white tracking-tight">
          Dexlure
        </h1>
      </div>

      <div className="flex flex-col gap-4">
        <NavLink
          key={0}
          to={"/chef/dish"}
          className={({ isActive }) =>
            [
              "px-3 py-4 rounded-lg text-[16px] transition-all duration-200 flex items-center",
              isActive
                ? "bg-white text-orange-600 shadow-sm font-semibold"
                : "text-orange-50 hover:bg-orange-500 hover:text-white",
            ].join(" ")
          }
        >
          <span>Quản lý món ăn</span>
        </NavLink>

        <NavLink
          key={1}
          to={"/chef/order"}
          className={({ isActive }) =>
            [
              "px-3 py-4 rounded-lg text-[16px] transition-all duration-200 flex items-center",
              isActive
                ? "bg-white text-orange-600 shadow-sm font-semibold"
                : "text-orange-50 hover:bg-orange-500 hover:text-white",
            ].join(" ")
          }
        >
          <span>Quản lý hóa đơn</span>
        </NavLink>
      </div>

      {/* Exit */}
      <button
        className="mt-auto flex items-center justify-center gap-3 py-2 text-white cursor-pointer"
        onClick={() => onLogout()}
      >
        <LogOut color="white" />
        <p className="text-white">Đăng xuất</p>
      </button>
    </div>
  );
};

export default SideBar;