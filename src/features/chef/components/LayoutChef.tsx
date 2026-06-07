import { useState } from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const LayoutChef = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:block">
        <div className="sticky top-0">
          <SideBar />
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <Header setIsOpen={setIsOpen}/>

        <main>
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

export default LayoutChef;