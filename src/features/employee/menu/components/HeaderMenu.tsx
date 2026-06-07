import { Menu, Search, ShoppingCart } from "lucide-react";
type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderMenu = ({ setIsOpen }: Props) => {
  // const [isOpenCartModal, setIsOpenCartModal] = useState<boolean>(false);

  // const fetchTotalItems = useTotalItemsStore((state) => state.fetchTotalItems);
  // const totalItems = useTotalItemsStore((state) => state.totalItems);
  // const orderId = localStorage.getItem("orderId") || null;

  // useEffect(() => {
  //   fetchTotalItems(orderId);
  // }, []);


  // const handleOk = () => {
  //   alert("Hello");
  // };

  // const handleCancelCartModal = () => {
  //   setIsOpenCartModal(false);
  // };

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
          onClick={() => alert("Giỏ hàng")}
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
          {1}
        </span>
      </div>

      {/* <CartModal
        isOpen={isOpenCartModal}
        handleOk={handleOk}
        handleCancel={handleCancelCartModal}
      /> */}
    </header>
  );
};

export default HeaderMenu;
