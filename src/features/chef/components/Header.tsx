import { Menu } from "lucide-react";
import { useCurrentUserStore } from "../../../hooks/useCurrentUserStore";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ setIsOpen }: Props) => {

  // Gọi store lưu thông tin profile global
  const user = useCurrentUserStore((state) => state.user);
  

  return (
    <div className="sticky top-0 z-55 flex items-center px-5 bg-white shadow-md py-4">
      <button
        className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Menu />
      </button>

      {/* User info */}
      <div className="flex items-center gap-3 ml-auto">
        <div className="text-right">
          <p className="text-sm text-gray-500">Hello,</p>
          <p className="text-sm font-semibold text-gray-800">{user?.fullName}</p>
        </div>

        <img
          src={"/default-avatar.png"}
          alt="avatar"
          className="w-9 h-9 rounded-full object-cover border border-gray-200 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
