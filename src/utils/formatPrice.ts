/**
 * Format giá tiền theo chuẩn Việt Nam
 * Ví dụ: 35000 → "35.000 đ"
 */
export const formatPrice = (amount: number | string | null | undefined): string => {
  if (amount == null || amount === '' || isNaN(Number(amount))) {
    return '0 đ';
  }

  const num = Number(amount);
  return num.toLocaleString('vi-VN') + ' đ';
};

/**
 * Format giá không có đơn vị (dùng cho InputNumber)
 * Ví dụ: 35000 → "35.000"
 */
export const formatPriceInput = (value: number | string | undefined): string => {
  if (!value) return '';
  return Number(value).toLocaleString('vi-VN');
};

/**
 * Parser cho InputNumber Ant Design (loại bỏ ký tự không phải số)
 */
export const parsePriceInput = (value: string | undefined): string => {
  if (!value) return '';
  // Chỉ giữ lại số
  return value.replace(/[^0-9]/g, '');
};