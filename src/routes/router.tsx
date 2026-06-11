import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import AuthLayout from "../components/layouts/AuthLayout";
import RegisterPage from "../features/auth/pages/RegisterPage";
import MainLayout from "../components/layouts/MainLayout";
import RecoveryPassword from "../features/auth/pages/RecoveryPassword";
import TestPage from "../pages/TestPage";
import SideBarMenu from "../features/employee/menu/components/SideBarMenu";
import Test from "../Test";
import { PublicRoute } from "../routes/PublicRoute";
import { fetchAllCategories } from "../features/employee/menu/api/category.api";
import EmployeeProfileRoute from "../features/user/routes/employee-profile";
import ChangePasswordRoute from "../features/auth/routes/change-password";
import AdminRoute from "../routes/AdminRoute";
import MenuRoute from "../features/employee/menu/routes/menu-route";
import NotFoundPage from "../pages/NotFoundPage";
import { LoginPage } from "../pages/Auth/Login";
import { StaffRoute } from "./StaffRoute";
import { DiningTablePage } from "../pages/DiningTable";
import { CategoryPage } from "../pages/Category";
import AdminLayout from "../components/layouts/admin/AdminLayout";
import { CreateDishPage } from "../pages/Admin/Dish/CreateDishPage";
import { UpdateDishPage } from "../pages/Admin/Dish/UpdateDishPage";
import { LandingPage } from "../pages/Landing";
import { ChefLayout } from "../components/layouts/chef/ChefLayout";
import { DishPage } from "../pages/Chef/Dish";
import { StaffDishPage } from "../pages/Staff/Dish";
import { AdminDishPage } from "../pages/Admin/Dish";
import { OrderChefPage } from "../pages/Chef/Order";
import { StaffOrderPage } from "../pages/Staff/Order";
import { UserPage } from "../pages/Admin/User";
import { AdminDiningTablePage } from "../pages/Admin/DiningTable";
import { ChefRoute } from "./ChefRoute";
import { CartPage } from "../pages/Staff/Dish/CartPage";
import { AdminOrderPage } from "../pages/Admin/Order";
import { DashboardPage } from "../pages/Admin/Dashboard";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/test",
            element: <Test />,
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
          {
            path: "/recovery-password",
            element: <RecoveryPassword />,
          },
          {
            path: "/test",
            element: <TestPage />,
          },
        ],
      },
    ],
  },

  // Admin
  {
    path: "/admin",
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          {
            path: "dashboard",
            element: <DashboardPage />
          },
          {
            path: "category",
            element: <CategoryPage />,
          },
          {
            path: "dish",
            element: <AdminDishPage />,
          },
          {
            path: "dish/create",
            element: <CreateDishPage />,
          },
          {
            path: "dish/:dishId",
            element: <UpdateDishPage />,
          },
          {
            path: "user",
            element: <UserPage />,
          },
          {
            path: "dining-table",
            element: <AdminDiningTablePage />,
          },
          {
            path: "order",
            element: <AdminOrderPage />,
          },
        ],
      },
    ],
  },

  {
    element: <StaffRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/dining-tables",
            element: <DiningTablePage />,
          },
          {
            path: "/payment-history",
            element: <StaffOrderPage />,
          },
          {
            path: "/profile",
            element: <EmployeeProfileRoute />,
          },
          {
            path: "/change-password",
            element: <ChangePasswordRoute />,
          },
        ],
      },
    ],
  },

  // Employee
  {
    element: <SideBarMenu />,
    children: [
      {
        path: "/menu",
        loader: async () => {
          const categories = await fetchAllCategories();
          if (categories.status === "success") {
            return redirect(`/menu/${categories.data[0]._id}`);
          }
          return null;
        },
      },
      {
        path: "/menu/:categoryId",
        element: <MenuRoute />,
      },
    ],
  },

  {
    path: "/orders/:orderId",
    element: <StaffRoute />,
    children: [
      {
        path: "dish",
        element: <StaffDishPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },

  // Chef
  {
    path: "/chef",
    element: <ChefRoute />,
    children: [
      {
        element: <ChefLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={"dish"} replace />,
          },

          {
            path: "dish",
            element: <DishPage />,
          },

          {
            path: "order",
            element: <OrderChefPage />,
          },
        ],
      },
    ],
  },

  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
