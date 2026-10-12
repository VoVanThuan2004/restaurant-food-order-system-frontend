import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, message, Popover } from "antd";
import { LogOut, Menu, X } from "lucide-react";
import useAuthStore from "../../stores/useAuthStore";
import { logoutApi } from "../../services/auth.api";
import { getApiError } from "../../utils/get-api-error";
import logo from "../../assets/logo.png";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);

  const onLogout = async () => {
    try {
      const res = await logoutApi();
      if (res.status === "success") navigate("/");
    } catch (error) {
      message.error(getApiError(error).message);
    } finally {
      clearSession();
      setShowMenu(false);
    }
  };

  const getInitials = (name?: string) =>
    name?.trim().split(/\s+/).filter(Boolean).map((part) => part[0]).join("").toUpperCase().slice(0, 2) || "U";

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-4 py-2 text-md font-medium transition-colors ${isActive ? "bg-white text-red-600" : "text-white hover:bg-white/15"}`;

  const accountMenu = (
    <div className="flex w-48 flex-col py-1">
      <button className="rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100" onClick={() => navigate("/profile")}>Xem profile</button>
      <button className="rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100" onClick={() => navigate("/change-password")}>Thay đổi mật khẩu</button>
      <button className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50" onClick={onLogout}>
        <LogOut size={16} /> Đăng xuất
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-red-500 shadow-md py-3">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/dining-tables" className="flex min-w-0 items-center gap-2.5" aria-label="Dexlure - Trang chủ">
          <img src={logo} alt="" className="h-10 w-10 shrink-0 rounded-lg bg-white p-1 object-contain shadow-sm sm:h-11 sm:w-11" />
          <span className="truncate text-xl font-bold tracking-tight text-white sm:text-2xl">Dexlure</span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          <NavLink to="/dining-tables" className={navClass}>Trang chủ</NavLink>
          <NavLink to="/payment-history" className={navClass}>Tra cứu hóa đơn</NavLink>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {user && (
            <Popover placement="bottomRight" content={accountMenu} trigger="click">
              <button className="flex cursor-pointer items-center gap-2 rounded-full p-1 text-white transition hover:bg-white/15" aria-label="Mở menu tài khoản">
                <Avatar src={user.avatarUrl || undefined} size={36} className="border border-white/60 bg-red-700 font-semibold">
                  {!user.avatarUrl && getInitials(user.fullName)}
                </Avatar>
                <span className="hidden max-w-36 truncate text-sm font-medium lg:block">{user.fullName}</span>
              </button>
            </Popover>
          )}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-white/15 md:hidden"
            onClick={() => setShowMenu((open) => !open)}
            aria-label={showMenu ? "Đóng menu" : "Mở menu"}
            aria-expanded={showMenu}
          >
            {showMenu ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {showMenu && (
        <nav className="flex flex-col gap-1 border-t border-white/20 px-4 py-3 md:hidden">
          <NavLink to="/dining-tables" className={navClass} onClick={() => setShowMenu(false)}>Trang chủ</NavLink>
          <NavLink to="/payment-history" className={navClass} onClick={() => setShowMenu(false)}>Tra cứu hóa đơn</NavLink>
          {user && (
            <>
              <Link to="/profile" className="rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-white/15" onClick={() => setShowMenu(false)}>Xem profile</Link>
              <Link to="/change-password" className="rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-white/15" onClick={() => setShowMenu(false)}>Thay đổi mật khẩu</Link>
              <button onClick={onLogout} className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-white hover:bg-white/15">
                <LogOut size={16} /> Đăng xuất
              </button>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
