import { Carousel } from "antd";
import { ChevronRight } from "lucide-react";

import bgHero1 from "../../../assets/bg-hero1.webp";
import bgHero2 from "../../../assets/bg-hero2.png";

export default function Hero() {
    const backgroundImages = [bgHero1, bgHero2];

    return (
        <section
            id="home"
            className="relative w-full min-h-[80vh] bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden"
        >
            {/* Background Carousel */}
            <div className="absolute inset-0">
                <Carousel
                    autoplay
                    autoplaySpeed={3000}
                    dots={true}
                    infinite
                    className="h-full"
                >
                    {backgroundImages.map((image, index) => (
                        <div key={index} className="h-[80vh]">
                            <div
                                className="h-full w-full bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${image})`,
                                }}
                            />
                        </div>
                    ))}
                </Carousel>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50" />
            </div>

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
                        Khám phá những món ăn đặc sắc với nguyên liệu tươi ngon
                        nhất, được chế biến bởi đầu bếp tài năng.
                    </p>

                    {/* CTA Button */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => {
                                const element = document.querySelector("#menu");
                                element?.scrollIntoView({
                                    behavior: "smooth",
                                });
                            }}
                            className="px-8 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            Xem thực đơn
                            <ChevronRight size={20} />
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