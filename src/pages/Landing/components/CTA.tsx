import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function CTA() {
    const navigate = useNavigate();

    return (
        <section className="py-16 md:py-24 bg-gradient-to-r from-red-500 to-red-600 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-400 rounded-full opacity-20 -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-700 rounded-full opacity-20 -ml-40 -mb-40" />

            {/* Content */}
            <div className="relative max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    Sẵn sàng trải nghiệm dịch vụ của chúng tôi?
                </h2>

                <p className="text-lg md:text-xl text-red-100 mb-10 max-w-2xl mx-auto">
                    Hãy khám phá thực đơn đa dạng và đặt món ngay hôm nay. Chúng tôi cam kết mang đến
                    trải nghiệm ẩm thực tuyệt vời nhất cho bạn.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => {
                            const element = document.querySelector("#menu");
                            element?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="px-8 py-4 bg-white text-red-500 rounded-xl font-bold hover:bg-red-50 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 text-lg"
                    >
                        Xem thực đơn
                        <ChevronRight size={22} />
                    </button>

                    <button
                        onClick={() => navigate("/login")}
                        className="px-8 py-4 bg-red-700 text-white rounded-xl font-bold hover:bg-red-800 transition-all duration-300 hover:shadow-lg text-lg border-2 border-white"
                    >
                        Đặt món ngay
                    </button>
                </div>
            </div>
        </section>
    );
}
