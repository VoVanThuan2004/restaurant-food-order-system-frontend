import { LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const ItemSideBar = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-[#0B1220] h-screen w-65 flex flex-col">
      {/* Logo + Tên nhà hàng */}
      <div className="flex items-center gap-2 mb-7">
        <svg
          className="w-6 h-6 text-white"
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
        <h1 className="text-xl font-bold text-white tracking-tight">ADMIN</h1>
      </div>

      <div className="flex flex-col gap-4">
        <NavLink
          key={0}
          to={`/admin/category`}
          className={({ isActive }) =>
            [
              "px-3 py-4 rounded-lg text-[16px] transition flex items-center",
              isActive
                ? "bg-[#1E293B] text-white font-medium"
                : "text-gray-400 font-medium hover:bg-[#1E293B] hover:text-white",
            ].join(" ")
          }
        >
          <span>Quản lý danh mục</span>
        </NavLink>

        <NavLink
          key={0}
          to={`/admin/menu`}
          className={({ isActive }) =>
            [
              "px-3 py-4 rounded-lg text-[16px] transition flex items-center",
              isActive
                ? "bg-[#1E293B] text-white font-medium"
                : "text-gray-400 font-medium hover:bg-[#1E293B] hover:text-white",
            ].join(" ")
          }
        >
          <span>Quản lý món ăn</span>
        </NavLink>

        <NavLink
          key={0}
          to={`/admin/user`}
          className={({ isActive }) =>
            [
              "px-3 py-4 rounded-lg text-[16px] transition flex items-center",
              isActive
                ? "bg-[#1E293B] text-white font-medium"
                : "text-gray-400 font-medium hover:bg-[#1E293B] hover:text-white",
            ].join(" ")
          }
        >
          <span>Quản lý người dùng</span>
        </NavLink>

        <NavLink
          key={0}
          to={`/admin/dine-table`}
          className={({ isActive }) =>
            [
              "px-3 py-4 rounded-lg text-[16px] transition flex items-center",
              isActive
                ? "bg-[#1E293B] text-white font-medium"
                : "text-gray-400 font-medium hover:bg-[#1E293B] hover:text-white",
            ].join(" ")
          }
        >
          <span>Quản lý bàn ăn</span>
        </NavLink>

        <NavLink
          key={0}
          to={`/admin/order`}
          className={({ isActive }) =>
            [
              "px-3 py-4 rounded-lg text-[16px] transition flex items-center",
              isActive
                ? "bg-[#1E293B] text-white font-medium"
                : "text-gray-400 font-medium hover:bg-[#1E293B] hover:text-white",
            ].join(" ")
          }
        >
          <span>Quản lý hóa đơn</span>
        </NavLink>
      </div>

      {/* Logout */}
      <button
        className="mt-auto flex items-center justify-center gap-3 py-2 text-white cursor-pointer"
        onClick={() => navigate("/")}
      >
        <LogOut color="white" />
        <p className="text-white">Exit</p>
      </button>
    </div>
  );
};

export default ItemSideBar;
