# Restaurant Food System - Frontend

Hệ thống quản lý nhà hàng thức ăn (Frontend), xây dựng bằng React + TypeScript + Vite.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 4
- **UI Library:** Ant Design 6
- **State Management:** Zustand + React Query (TanStack Query)
- **Routing:** React Router DOM 7
- **Form Handling:** React Hook Form + Zod
- **HTTP Client:** Axios
- **Real-time:** STOMP (WebSocket) + Socket.IO

## Cài đặt

```bash
# Clone repository
git clone <repo-url>
cd my-project

# Cài dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Cấu trúc thư mục

```
src/
├── app/                # App configuration
├── assets/             # Static assets (images, icons)
├── components/         # Shared components
│   └── layouts/        # Layout components (Admin, Staff, Chef, Auth, Main)
├── hooks/              # Custom hooks
├── pages/              # Page components
│   ├── Admin/          # Admin pages (Dashboard, Dish, User, Order, DiningTable, Category)
│   ├── Auth/           # Authentication pages (Login)
│   ├── Chef/           # Chef pages (Dish, Order)
│   ├── Staff/          # Staff pages (Dish, Order)
│   ├── Landing/        # Landing page
│   ├── Profile/        # User profile
│   ├── ChangePassword/ # Change password
│   └── DiningTable/    # Dining table management
├── routes/             # Route definitions & guards
├── services/           # API service layer
├── stores/             # Zustand stores
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Routes

| Route | Role | Mô tả |
|-------|------|-------|
| `/` | Public | Landing page |
| `/login` | Public | Đăng nhập |
| `/admin/dashboard` | Admin | Dashboard tổng quan |
| `/admin/dish` | Admin | Quản lý món ăn |
| `/admin/category` | Admin | Quản lý danh mục |
| `/admin/user` | Admin | Quản lý người dùng |
| `/admin/order` | Admin | Quản lý đơn hàng |
| `/admin/dining-table` | Admin | Quản lý bàn ăn |
| `/dining-tables` | Staff | Xem trạng thái bàn |
| `/orders/:orderId/dish` | Staff | Gọi món |
| `/orders/:orderId/cart` | Staff | Giỏ hàng |
| `/payment-history` | Staff | Lịch sử thanh toán |
| `/chef/dish` | Chef | Danh sách món ăn |
| `/chef/order` | Chef | Quản lý đơn hàng bếp |
| `/profile` | All | Hồ sơ cá nhân |
| `/change-password` | All | Đổi mật khẩu |
