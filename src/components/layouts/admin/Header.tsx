import { Menu } from "lucide-react";
import useAuthStore from "../../../stores/useAuthStore";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ setIsOpen }: Props) => {
  const user = useAuthStore((state) => state.user);

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

  return (
    <div className="flex items-center px-5 bg-white shadow-md py-4">
      <button
        className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Menu />
      </button>

      {/* User info */}
      <div className="flex items-center gap-3 ml-auto">
        <div className="text-right">
          <p className="text-sm text-gray-500">Xin chào,</p>
          <p className="text-sm font-semibold text-gray-800">
            {user?.fullName || "Người dùng"}
          </p>
        </div>

        {/* Avatar */}
        <div className="relative">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="avatar"
              className="w-9 h-9 rounded-full object-cover border border-gray-200 cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
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
      </div>
    </div>
  );
};

export default Header;
