import { Zap, Gift, Cake } from "lucide-react";

interface Promotion {
    id: string;
    title: string;
    description: string;
    discount: string;
    icon: React.ReactNode;
    image: string;
}

const promotions: Promotion[] = [
    {
        id: "1",
        title: "Combo tiết kiệm",
        description: "Combo thịt bò cao cấp + hải sản + rau + đồ uống",
        discount: "Giảm 30%",
        icon: <Gift className="w-8 h-8" />,
        image: "https://images.unsplash.com/photo-1565958011504-98d7112121d7?w=500&h=300&fit=crop",
    },
    {
        id: "2",
        title: "Khuyến mãi cuối tuần",
        description: "Mua 2 người, người thứ 3 ăn miễn phí (giá tương đương)",
        discount: "Ưu đãi đặc biệt",
        icon: <Zap className="w-8 h-8" />,
        image: "https://images.unsplash.com/photo-1504674900684-b4095e59b530?w=500&h=300&fit=crop",
    },
    {
        id: "3",
        title: "Ưu đãi sinh nhật",
        description: "Giảm 20% toàn bộ hóa đơn khi có khách sinh nhật",
        discount: "Giảm 20%",
        icon: <Cake className="w-8 h-8" />,
        image: "https://images.unsplash.com/photo-1585521922653-a955e0fc0f7a?w=500&h=300&fit=crop",
    },
];

export default function Promotions() {
    return (
        <section id="promotions" className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Chương trình khuyến mãi
                    </h2>
                    <p className="text-gray-700 text-lg">
                        Những ưu đãi đặc biệt dành cho bạn
                    </p>
                </div>

                {/* Promotions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {promotions.map((promo) => (
                        <div
                            key={promo.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                        >
                            {/* Image */}
                            <div className="relative h-40 overflow-hidden bg-gray-100">
                                <img
                                    src={promo.image}
                                    alt={promo.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-2">
                                            {promo.icon}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {promo.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {promo.description}
                                </p>
                                <div className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold">
                                    {promo.discount}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
