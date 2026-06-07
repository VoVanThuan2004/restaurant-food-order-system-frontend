import MenuImage from "../../../../assets/bo_hadilao.webp";

const OrderItem = () => {
  return (
    <div className="flex justify-between mt-5">
      <div className="flex gap-2.5">
        {/* ảnh */}
        <img src={MenuImage} alt="item" className="w-15 rounded-sm" />

        {/* Tên món ăn + số lượng */}
        <div>
          <p>Spicy Beef</p>
          <div className="bg-red-100 text-red-500 font-semibold w-10 rounded-sm text-center py-0.5">
            x1
          </div>
        </div>
      </div>

      {/* Giá */}
      <p className="text-[16px] font-semibold">180.000 ₫</p>
    </div>
  );
};

export default OrderItem;
