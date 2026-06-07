import { useMemo, useState } from "react";
import { useCategories } from "../../../hooks/category/useCategories";
import type { CategoryResponse } from "../../../types/category.type";
import Spinner from "../../../components/Spinner";
import { Button, Select } from "antd";
import { DishTable } from "./DishTable";
import { useNavigate } from "react-router-dom";
import { useAdminDish } from "../../../hooks/dish/useAdminDish";

export const AdminDishPage = () => {
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
  });

  // Gọi hook api lấy danh sách menu theo category
  const { data, isLoading, isError } = useAdminDish({
    page: pagination.page,
    size: pagination.size,
    ...(categoryId && { categoryId }),
  });
  const dishes = data?.data?.content || [];

  // Gọi hook api lấy danh sách categories
  const { data: categoryData } = useCategories();
  const categories = categoryData?.data || [];
  const categoryOptions = useMemo(() => {
    return [
      { value: null, label: "Tất cả" },
      ...categories.map((c: CategoryResponse) => ({
        value: c.categoryId,
        label: c.categoryName,
      })),
    ];
  }, [categories]);

  return (
    <div className="px-5 mt-5">
      {isError && <div>Error</div>}

      {/* Lọc theo category + nút thêm menu */}
      <div className="flex justify-between mb-5">
        <Select
          showSearch={{
            filterOption: (input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase()),
          }}
          placeholder="Lọc theo danh mục"
          options={categoryOptions}
          onChange={(value) => setCategoryId(value ?? null)}
          style={{ width: 240 }}
        />

        <Button type="primary" onClick={() => navigate("/admin/dish/create")}>
          Thêm món ăn
        </Button>
      </div>

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
            <Spinner color="37baff" />
          </div>
        )}

        <DishTable
          dishes={dishes}
          pagination={pagination}
          setPagination={setPagination}
          total={data?.data?.totalElements as number}
          loading={isLoading}
        />
      </div>
    </div>
  );
};
