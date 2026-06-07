import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CategorySidebar } from "./CategorySidebar";
import { DishList } from "./DishList";
import Header from "./Header";

export const StaffDishPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const categoryId = searchParams.get("category");

  // Gọi api lấy 

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden md:block">
        <div className="sticky top-0">
          <CategorySidebar />
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <Header setIsOpen={setIsOpen} />

        <main>
          <DishList categoryId={categoryId} />
        </main>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 left-0 h-full w-64 bg-white shadow-lg
          transition-transform duration-100 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <CategorySidebar />
        </div>
      </div>
    </div>
  );
};
