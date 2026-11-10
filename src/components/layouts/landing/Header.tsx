import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../../assets/logo.png";
import { logoutApi } from "../../../services/auth.api";
import { getApiError } from "../../../utils/get-api-error";
import useAuthStore from "../../../stores/useAuthStore";
import { message, Popover } from "antd";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const clearSession = useAuthStore((state) => state.clearSession);
  const isAuthentication = useAuthStore((state) => state.isAuthentication);
  const user = useAuthStore((state) => state.user);
  const isCustomer = user?.roles.includes("CUSTOMER") ?? false;

  const menuItems = [
    { label: "Trang chủ", href: "#home" },
    { label: "Thực đơn", href: "#menu" },
    { label: "Khuyến mãi", href: "#promotions" },
    { label: "Giới thiệu", href: "#about" },
    { label: "Liên hệ", href: "#contact" },
  ];

  const isLandingPage = location.pathname === "/";

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);

    if (!isLandingPage) {
      navigate(`/${href}`);
      return;
    }

    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const goHome = () => {
    setMobileMenuOpen(false);

    if (!isLandingPage) {
      navigate("/");
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      setMobileMenuOpen(false);
    }
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return "U";
    return name
      .trim()
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2); // Lấy tối đa 2 chữ cái
  };

  const getRoleName = (roles: string[] | undefined) => {
    if (roles === undefined) return null;

    if (roles.includes("ADMIN")) return "quản trị";
    else if (roles.includes("CHEF")) return "đầu bếp";
    else if (roles.includes("STAFF")) return "nhân viên";
    else if (roles.includes("CUSTOMER")) return "khách hàng";
  }

  const getNavigateRole = (roles: string[] | undefined) => {
    if (roles === undefined) return null;

    if (roles.includes("ADMIN")) return "/admin";
    else if (roles.includes("CHEF")) return "/chef";
    else if (roles.includes("STAFF")) return "/dining-tables";
    else if (roles.includes("CUSTOMER")) return "/";
  }

  const content = (
    <div className="flex flex-col w-48 py-2">
      <button
        className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
        onClick={() => navigate(getNavigateRole(user?.roles as string[]) as string)}
      >
        Trang {getRoleName(user?.roles as string[])}
      </button>

      {isCustomer && (
        <>
          <button
            className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => navigate("/customer/profile")}
          >
            Hồ sơ
          </button>
          <button
            className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => navigate("/customer/change-password")}
          >
            Đổi mật khẩu
          </button>
        </>
      )}

      <button
        className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
        onClick={() => onLogout()}
      >
        Đăng xuất
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={goHome}
        >
          <img
            src={logo}
            alt="Dexlure Logo"
            className="h-10 w-auto object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
          />
          <span className="font-bold text-2xl text-gray-900 tracking-tight">
            Dexlure
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="text-gray-700 hover:text-red-500 transition-colors duration-300 font-medium"
            >
              {item.label}
            </button>
          ))}
        </div>

        {isAuthentication === false ? (
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 font-medium cursor-pointer"
            >
              Đăng nhập
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-2 border border-red-500 text-red-500 rounded-xl hover:bg-red-50 transition-all duration-300 font-medium cursor-pointer"
            >
              Đăng ký
            </button>
          </div>
        ) : (
          <Popover placement="bottomRight" content={content}>
            <div className="relative">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover border border-gray-200 cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling?.classList.remove(
                      "hidden",
                    );
                  }}
                />
              ) : null}

              {/* Avatar fallback (chữ cái đầu) */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm border border-gray-200 cursor-pointer hover:ring-2 hover:ring-blue-500 transition
            ${user?.avatarUrl ? "hidden" : "bg-gradient-to-br from-blue-500 to-indigo-600"}`}
              >
                {getInitials(user?.fullName)}
              </div>
            </div>
          </Popover>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {item.label}
            </button>
          ))}
          {isAuthentication === false && (
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/login");
                }}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-medium"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/register");
                }}
                className="w-full px-4 py-2 border border-red-500 text-red-500 rounded-xl hover:bg-red-50 transition-all font-medium"
              >
                Đăng ký
              </button>
            </div>
          )}

          {isAuthentication && isCustomer && (
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/customer/profile");
                }}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Hồ sơ
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/customer/change-password");
                }}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Đổi mật khẩu
              </button>
              <button
                onClick={onLogout}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
