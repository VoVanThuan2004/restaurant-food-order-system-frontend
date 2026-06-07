import { useState } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export const ChefLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <aside className="hidden md:block">
        <div className="sticky top-0">
          <SideBar />
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col h-screen">
        <div className="sticky top-0 z-40">
          <Header setIsOpen={setIsOpen} />
        </div>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`md:hidden fixed inset-0 z-60 transition-opacity duration-300 ${
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
          <SideBar />
        </div>
      </div>
    </div>
  );
};
