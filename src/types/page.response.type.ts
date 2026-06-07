// Page Response interface chung
export interface PageResponse<T> {
  content: T[];           // Danh sách dữ liệu
  pageable: Pageable;     // Thông tin phân trang
  totalPages: number;     // Tổng số trang
  totalElements: number;  // Tổng số phần tử
  last: boolean;          // Có phải trang cuối không
  first: boolean;         // Có phải trang đầu không
  size: number;           // Kích thước mỗi trang
  number: number;         // Số trang hiện tại (0-based)
  sort: Sort;             // Thông tin sắp xếp
  numberOfElements: number; // Số phần tử của trang hiện tại
  empty: boolean;         // Trang có rỗng không
}

// Thông tin phân trang (thường không dùng nhiều ở FE)
export interface Pageable {
  pageNumber: number;     // Số trang (0-based)
  pageSize: number;       // Kích thước trang
  sort: Sort;             // Thông tin sắp xếp
  offset: number;         // Vị trí bắt đầu
  paged: boolean;         // Có phân trang không
  unpaged: boolean;       // Có không phân trang không
}

// Thông tin sắp xếp
export interface Sort {
  sorted: boolean;        // Đã sắp xếp chưa
  unsorted: boolean;      // Chưa sắp xếp
  empty: boolean;         // Rỗng
}