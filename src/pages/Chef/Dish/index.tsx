import { Empty, Select } from "antd";
import Spinner from "../../../components/Spinner";
import { useCategories } from "../../../hooks/category/useCategories";
import { useDishes } from "../../../hooks/dish/useDishes";
import { useEffect, useRef, useState } from "react";
import type { DishResponse } from "../../../types/dish.type";
import { DishCard } from "./DishCard";

export const DishPage = () => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);


  // Gọi hook api lấy categories
  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.data || [];
  const categoryOptions = categories.map((c) => ({
    label: c.categoryName,
    value: c.categoryId,
  }));

  // Gọi hook api lấy danh sách món ăn
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useDishes({
    size: 12,
    ...(categoryId && {
      categoryId,
    }),
  });
  const dishes = data?.pages.flatMap((page) => page?.data?.content) || [];

  // ==================== INFINITE SCROLL ====================
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }, // Kích hoạt khi thấy 50% element
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);


  return (
    <div className="px-5 mt-5">
      {isError && <div className="text-center text-red-500">Lỗi hệ thống</div>}

      <Select
        showSearch
        placeholder="Lọc theo danh mục"
        options={categoryOptions}
        onChange={(value) => setCategoryId(value ?? null)}
        style={{ width: 240 }}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
      />

      <div className="relative min-h-[400px] mt-5">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
            <Spinner color="#f97316" />
          </div>
        )}

        {!isLoading && dishes.length === 0 && (
          <div className="flex justify-center items-center h-[300px]">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Không có món ăn"
            />
          </div>
        )}

        {!isLoading && dishes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dishes
              .filter((dish): dish is DishResponse => dish !== undefined) // Type Guard
              .map((dish) => (
                <DishCard key={dish.dishId} {...dish} />
              ))}
          </div>
        )}

        {/* Loading khi kéo xuống load thêm */}
        <div ref={observerTarget} className="py-8 flex justify-center">
          {isFetchingNextPage && <Spinner color="#f97316" />}
        </div>

        {/* Thông báo hết dữ liệu */}
        {!hasNextPage && dishes.length > 0 && (
          <div className="text-center text-gray-500 py-6">
            Đã hiển thị tất cả món ăn
          </div>
        )}
      </div>
    </div>
  );
};
