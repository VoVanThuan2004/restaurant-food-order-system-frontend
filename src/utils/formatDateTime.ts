const formatDateTime = (value: string | Date) => {
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return ""; // phòng trường hợp dữ liệu lỗi
  return d.toLocaleString(); // hoặc toLocaleDateString() nếu chỉ cần ngày
};

export default formatDateTime;
