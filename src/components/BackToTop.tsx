import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Nếu đang ở đầu trang thì ẩn nút back to top
  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Lên đầu trang"
      title="Lên đầu trang"
      className="fixed right-7 bottom-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-all duration-300 cursor-pointer"
    >
      {" "}
      <ArrowUp size={22} />{" "}
    </button>
  );
};

export default BackToTop;
