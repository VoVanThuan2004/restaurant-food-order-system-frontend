import { Menu, Search, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { CartDrawer } from "./CartDrawer";
import { useNavigate, useParams } from "react-router-dom";
import { useTotalItemsStore } from "../../../stores/useTotalItemsStore";
type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ setIsOpen }: Props) => {
  const { orderId } = useParams();
  const [openCart, setOpenCart] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchTotalItems = useTotalItemsStore((state) => state.fetchTotalItems);
  const totalItems = useTotalItemsStore((state) => state.totalItems);

  useEffect(() => {
    if (!orderId) return;
    fetchTotalItems(orderId);
  }, []);

  // const onOpenCartDrawer = () => {
  //   if (!orderId) {
  //     navigate("/");
  //     return;
  //   }
  //   setOpenCart(true);
  // };

  const onOpenCart = () => {
    if (!orderId) {
      navigate("/");
      return;
    }
    navigate(`/orders/${orderId}/cart`);
  }

  const onCloseCartDrawer = () => {
    setOpenCart(false);
  };

  return (
    <header className="flex items-center justify-between sticky top-0 bg-white shadow-lg py-5 px-4 w-full">
      {/* Tên danh mục (category) */}
      {/* <p className="font-bold text-[22px]">Món nướng</p> */}
      <button
        className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Menu />
      </button>

      {/* Thanh search */}
      <div className="flex items-center bg-gray-100 px-4 py-2.5 gap-2 lg:w-100 rounded-md">
        <Search color="gray" size={20} />

        <input
          type="search"
          placeholder="Search menu items"
          className="flex-1 bg-transparent outline-none"
        />
      </div>

      <div>
        <button
          className="flex items-center justify-center bg-red-500 p-3 gap-2 rounded-xl cursor-pointer hover:shadow-md transition"
          onClick={() => onOpenCart()}
        >
          <ShoppingCart className="text-white" size={20} />
          <p className="hidden lg:block text-white">Giỏ hàng</p>
        </button>

        <span
          className="absolute top-4 right-3 
                     min-w-[18px] h-[20px] 
                     px-1.5 text-[13px] 
                     flex items-center justify-center
                     bg-white text-red-500 
                     rounded-full font-semibold border border-red-200"
        >
          {totalItems}
        </span>
      </div>

      <CartDrawer
        open={openCart}
        onClose={onCloseCartDrawer}
        orderId={orderId as string}
      />
    </header>
  );
};

export default Header;
