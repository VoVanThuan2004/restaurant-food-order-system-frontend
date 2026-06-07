# Landing Page Design Skill

## Project Context

Website đại diện cho một nhà hàng hiện đại có hệ thống gọi món điện tử.

Khách hàng có thể:

* Xem thông tin nhà hàng
* Xem thực đơn
* Xem món ăn nổi bật
* Xem chương trình khuyến mãi
* Truy cập trang gọi món

Nhân viên nội bộ có thể:

* Đăng nhập hệ thống
* Quản lý bàn ăn
* Quản lý đơn hàng
* Theo dõi chế biến món ăn
* Thanh toán

Landing Page phải mang phong cách cao cấp, hiện đại, tương tự các thương hiệu như Haidilao, Kichi Kichi, Manwah hoặc các chuỗi nhà hàng lớn.

---

## Design Style

### General

* Modern
* Premium
* Clean
* Responsive
* Mobile First

### Visual Tone

* Sang trọng
* Ấm áp
* Chuyên nghiệp
* Tập trung vào hình ảnh món ăn

### Colors

Primary:

* Red 500
* Red 600

Secondary:

* Orange 500
* Amber 500

Neutral:

* White
* Gray 50
* Gray 100
* Gray 700
* Gray 900

### Border Radius

* rounded-xl
* rounded-2xl

### Shadow

* shadow-sm
* shadow-md
* shadow-lg

### Animation

* transition-all duration-300
* hover:scale-[1.02]
* hover:shadow-lg

---

## Layout Structure

Landing Page luôn gồm các section sau theo đúng thứ tự.

### 1. Header

Bao gồm:

* Logo nhà hàng
* Trang chủ
* Thực đơn
* Khuyến mãi
* Giới thiệu
* Liên hệ

Bên phải:

* Nút Đăng nhập hệ thống

Yêu cầu:

* Sticky top
* Background trắng
* Shadow nhẹ khi scroll

---

### 2. Hero Section

Mục tiêu:

Tạo ấn tượng mạnh ngay khi truy cập.

Bao gồm:

* Tiêu đề lớn
* Mô tả ngắn
* Nút Xem thực đơn
* Nút Đặt món

Bên cạnh:

* Ảnh món ăn chất lượng cao
* Hoặc ảnh không gian nhà hàng

Yêu cầu:

* Full width
* Cao tối thiểu 80vh

---

### 3. Featured Dishes

Hiển thị:

* 6 đến 8 món ăn nổi bật

Mỗi card gồm:

* Hình ảnh
* Tên món
* Giá
* Mô tả ngắn

Yêu cầu:

* Grid responsive
* Card đẹp
* Hover effect

---

### 4. Categories Section

Hiển thị các danh mục:

* Thịt bò
* Hải sản
* Rau
* Đồ uống
* Tráng miệng

Mỗi danh mục:

* Icon hoặc hình ảnh
* Tên danh mục

---

### 5. About Restaurant

Giới thiệu:

* Lịch sử nhà hàng
* Chất lượng nguyên liệu
* Cam kết phục vụ

Bố cục:

* Hình ảnh bên trái
* Nội dung bên phải

---

### 6. Why Choose Us

Hiển thị 4 đến 6 lợi ích.

Ví dụ:

* Nguyên liệu tươi mỗi ngày
* Đặt món nhanh chóng
* Phục vụ chuyên nghiệp
* Không gian hiện đại
* Thanh toán tiện lợi
* Theo dõi món ăn thời gian thực

Dùng card với icon.

---

### 7. Customer Reviews

Hiển thị:

* Avatar
* Tên khách hàng
* Nội dung đánh giá
* Số sao

Dạng carousel hoặc grid.

---

### 8. Promotion Section

Hiển thị:

* Combo nổi bật
* Khuyến mãi
* Ưu đãi sinh nhật

Card có hình ảnh lớn.

---

### 9. Call To Action

Tiêu đề:

Sẵn sàng trải nghiệm dịch vụ của chúng tôi?

Nút:

* Xem thực đơn
* Đặt món ngay

Background nổi bật.

---

### 10. Footer

Bao gồm:

* Logo
* Địa chỉ
* Email
* Số điện thoại
* Mạng xã hội
* Copyright

---

## Images

Ưu tiên:

* Món ăn chất lượng cao
* Không gian nhà hàng hiện đại
* Hình ảnh thực tế

Không sử dụng:

* Hình minh họa hoạt hình
* Hình low quality

---

## Coding Rules

* React + TypeScript
* TailwindCSS
* Component tách nhỏ
* Responsive toàn bộ
* Không hardcode dữ liệu trong component lớn
* Sử dụng reusable components
* Accessibility cơ bản
* Semantic HTML

---

## Important

Landing Page chỉ phục vụ mục đích marketing và giới thiệu nhà hàng.

Không hiển thị:

* Danh sách bàn đang hoạt động
* Trạng thái bàn ăn
* Đơn hàng nội bộ
* Dữ liệu quản trị
* Thông tin nhân viên

Nút Đăng nhập chỉ dùng để truy cập hệ thống quản lý nội bộ.
