import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import type { Category } from "../types/category.type";
import { useCategories } from "../hooks/useCategories";

const CategorySidebar = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useCategories();
  const categories = data?.data || [];


  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        Lỗi khi tải danh mục
      </div>
    )
  }

  const handleExit = () => {
    localStorage.removeItem("orderId");
    navigate("/");
  }

  return (
    <div className="p-4 bg-red-500 h-screen w-65 flex flex-col">
      {/* Logo + Tên nhà hàng */}
      <div className="flex items-center gap-1.5 mb-7">
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
        <h1 className="text-xl font-bold text-white tracking-tight">
          Deluxe Restaurant
        </h1>
      </div>

      <div className="flex flex-col gap-4">
        {categories.map((c: Category) => (
          <NavLink
            key={c._id}
            to={`/menu/${c._id}`}
            className={({ isActive }) =>
              [
                "px-3 py-4 rounded-lg text-[16px] transition flex items-center",
                isActive
                  ? "bg-red-50 text-red-600 font-medium"
                  : "text-gray-100 font-medium hover:bg-red-50 hover:text-red-600",
              ].join(" ")
            }
          >
            <span>{c.categoryName}</span>
          </NavLink>
        ))}
      </div>

      {/* Exit */}
      <button
        className="mt-auto flex items-center justify-center gap-3 py-2 text-white cursor-pointer"
        onClick={() => handleExit()}
      >
        <LogOut color="white" />
        <p className="text-white">Exit</p>
      </button>
    </div>
  );
};

export default CategorySidebar;
