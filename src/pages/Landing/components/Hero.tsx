import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Hero() {
    const navigate = useNavigate();

    return (
        <section id="home" className="relative w-full min-h-[80vh] bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
            {/* Background Image Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{
                    backgroundImage: `url('${import.meta.env.VITE_API_URL || ''}/assets/bo_hadilao.webp')`,
                }}
            />

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-4 h-[80vh] flex items-center">
                <div className="max-w-2xl">
                    {/* Main Title */}
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Trải nghiệm ẩm thực
                        <span className="text-red-500"> cao cấp</span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
                        Khám phá những món ăn đặc sắc với nguyên liệu tươi ngon nhất, được chế biến bởi đầu bếp trang nhân.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => {
                                const element = document.querySelector("#menu");
                                element?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="px-8 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            Xem thực đơn
                            <ChevronRight size={20} />
                        </button>

                        <button
                            onClick={() => navigate("/login")}
                            className="px-8 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
                        >
                            Đặt món ngay
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-red-500 rounded-full opacity-10" />
            <div className="absolute bottom-20 left-10 w-32 h-32 bg-orange-500 rounded-full opacity-10" />
        </section>
    );
}
