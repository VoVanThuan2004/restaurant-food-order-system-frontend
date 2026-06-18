import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Avatar, message, Popover } from "antd";
import useAuthStore from "../../stores/useAuthStore";
import { logoutApi } from "../../services/auth.api";
import { getApiError } from "../../utils/get-api-error";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const clearSession = useAuthStore((state) => state.clearSession);

  // logout
  const onLogout = async () => {
    try {
      const res = await logoutApi();

      if (res.status === "success") {
        navigate("/");
      }
    } catch (error) {
      const apiError = getApiError(error);
      message.error(apiError.message);
    } finally {
      clearSession();
    }
  };

  const content = (
    <div className="flex flex-col w-48 py-2">
      <button
        className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
        onClick={() => navigate("/profile")}
      >
        Xem profile
      </button>

      <button
        className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
        onClick={() => navigate("change-password")}
      >
        Thay đổi mật khẩu
      </button>
    </div>
  );

  return (
    <header className="bg-red-500 shadow-md py-6 w-full top-0 left-0 sticky px-4 z-100">
      <div className="flex justify-between items-center">
        {/* Title */}
        <div className="flex items-center gap-2">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Hadilao Restaurant
          </h1>
        </div>

        {/* Nav điều hướng */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-12">
          {/* Trang chủ */}
          <NavLink
            to="/dining-tables"
            className={({ isActive }) =>
              [
                "px-4 py-2.5 rounded-lg transition font-medium",
                isActive ? "bg-white text-red-500" : "text-white",
              ].join(" ")
            }
          >
            Trang chủ
          </NavLink>

          {/* Tra cứu hóa đơn */}
          <NavLink
            to="/payment-history"
            className={({ isActive }) =>
              [
                "px-4 py-2.5 rounded-lg transition font-medium",
                isActive ? "bg-white text-red-500" : "text-white",
              ].join(" ")
            }
          >
            Tra cứu hóa đơn
          </NavLink>
        </nav>

        <Popover placement="bottomRight" content={content}>
          <Avatar className="cursor-pointer">U</Avatar>
        </Popover>

        {/* Menu khi màn hình nhỏ */}
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        >
          <Menu color="white" />
        </button>

        <button
          className="hidden md:flex px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 flex items-center space-x-1 cursor-pointer"
          onClick={onLogout}
        >
          <span>Đăng xuất</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>

      {showMenu && (
        <div className="md:hidden bg-red-500 border-t border-white mt-6">
          <div className="flex flex-col items-center gap-3 mt-6">
            <Link to="/" className="text-white hover:text-gray-200">
              Trang chủ
            </Link>
            <Link
              to="/payment-history"
              className="text-white hover:text-gray-200"
            >
              Tra cứu hóa đơn
            </Link>

            {/* Logout */}
            <button
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 flex items-center space-x-2 cursor-pointer"
              onClick={onLogout}
            >
              <span>Đăng xuất</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
