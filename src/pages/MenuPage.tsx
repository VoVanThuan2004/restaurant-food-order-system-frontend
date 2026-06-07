import { useParams } from "react-router-dom";
import MenuCard from "../features/employee/menu/components/MenuCard";
import { useMenu } from "../features/employee/menu/hooks/useMenu";
import type { MenuType } from "../features/employee/menu/types/menu.type";
import { LoaderCircle } from "lucide-react";

const MenuPage = () => {
  // Nhận params categoryId
  const { categoryId } = useParams<{ categoryId: string }>();

  if (!categoryId) {
    throw new Error("categoryId is required");
  }

  // Gọi API lấy danh sách menu dựa theo categoryId
  const { data, isLoading, isError } = useMenu({ categoryId });
  const menus = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-150">
        <LoaderCircle
          color="red"
          className="animate-spin"
          size={45}
          strokeWidth={2}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-150">
        Không thể tải dữ liệu món ăn
      </div>
    );
  }

  return (
    <div className="px-5">
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* <MenuCard key={1} />
        <MenuCard key={2} />
        <MenuCard key={3} />
        <MenuCard key={4} />
        <MenuCard key={5} /> */}

        {menus.map((menu: MenuType) => (
          <MenuCard key={menu._id} />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
