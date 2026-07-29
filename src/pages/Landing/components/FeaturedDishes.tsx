import { useState } from "react";
import { useDishes } from "../../../hooks/dish/useDishes";
import type { DishResponse } from "../../../types/dish.type";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export default function FeaturedDishes() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useDishes({ size: 6 });

  const currentPageData = data?.pages[currentPage]?.data;
  const dishes = currentPageData?.content || [];
  const totalPages = data?.pages[0]?.data?.totalPages || 0;

  const handleNext = () => {
    const nextPage = currentPage + 1;
    if (data?.pages[nextPage]) {
      setCurrentPage(nextPage);
    } else if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage().then(() => setCurrentPage(nextPage));
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <section id="menu" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Món ăn nổi bật
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Những món ăn được yêu thích nhất của khách hàng, được chế biến tươi
            mỗi ngày
          </p>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : dishes.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            Chưa có món ăn nào
          </div>
        ) : (
          <>
            {/* Dishes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dishes.map((dish: DishResponse) => (
                <div
                  key={dish.dishId}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 shrink-0 overflow-hidden bg-gray-100">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-medium ${
                        dish.status
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {dish.status ? "Đang bán" : "Tạm hết"}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col justify-between h-full">
                    <h3 className="font-bold text-lg text-gray-900">
                      {dish.name}
                    </h3>
                    <div className="border-t border-gray-100 mt-3 pt-3">
                      <span className="text-red-500 font-bold text-xl">
                        {dish.basePrice.toLocaleString("vi-VN")}₫
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 0}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <LeftOutlined className="text-xs" />
                  Trang trước
                </button>

                <span className="text-sm text-gray-600">
                  Trang {currentPage + 1} / {totalPages}
                </span>

                <button
                  onClick={handleNext}
                  disabled={
                    currentPage >= totalPages - 1 || isFetchingNextPage
                  }
                  className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {isFetchingNextPage ? (
                    <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <RightOutlined className="text-xs" />
                  )}
                  Trang sau
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
