import { Outlet } from "react-router-dom";
import Header from "../landing/Header";
import Footer from "../landing/Footer";

const CustomerLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default CustomerLayout;
