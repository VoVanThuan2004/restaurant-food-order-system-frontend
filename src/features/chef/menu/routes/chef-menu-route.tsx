import { Empty, Select } from "antd";
import { useEffect, useState } from "react";
import type { CategoryType, SelectOption } from "../types/category";
import { getCategoriesApi } from "../api/get-categories";
import { useGetMenus } from "../hooks/useGetMenus";
import Spinner from "../../../../components/Spinner";
import MenuCard from "../components/MenuCard";
import type { Menu } from "../types/menu";
import { useMenuStatusSocket } from "../hooks/useMenuStatusSocket";

const ChefMenuRoute = () => {
  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [categoryId, setCategoryId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoriesApi();

        const formatted = [
          { value: null, label: "Tất cả" },
          ...data.data.map((c: CategoryType) => ({
            value: c._id,
            label: c.categoryName,
          })),
        ];

        setCategories(formatted);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  useMenuStatusSocket();

  // Gọi hook api lấy danh sách món ăn
  const { data, isLoading, isError } = useGetMenus(categoryId);
  const menus = data?.data || [];

  return (
    <div className="px-5 mt-5">
      {isError && <div className="text-center">Lỗi hệ thống</div>}

      <Select
        showSearch
        placeholder="Lọc theo danh mục"
        options={categories}
        onChange={(value) => setCategoryId(value ?? null)}
        style={{ width: 240 }}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
      />

      <div className="relative min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
            <Spinner color="#f97316" />
          </div>
        )}

        {!isLoading && menus.length === 0 && (
          <div className="flex justify-center items-center h-[300px]">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Không có món ăn"
            />
          </div>
        )}

        {!isLoading && menus.length > 0 && (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {menus.map((menu: Menu) => (
              <MenuCard key={menu._id} {...menu} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChefMenuRoute;
