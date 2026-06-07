import { Star } from "lucide-react";

interface Dish {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    rating?: number;
}

const featuredDishes: Dish[] = [
    {
        id: "1",
        name: "Thịt bò Wagyu nướng",
        price: 250000,
        description: "Thịt bò Wagyu cao cấp nướng trên bếp than, mềm mại và thơm ngon",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
        rating: 4.8,
    },
    {
        id: "2",
        name: "Tôm tươi sống",
        price: 180000,
        description: "Tôm biển tươi sống, nướng vàng ngoài, mềm trong và rất ngon",
        image: "https://images.unsplash.com/photo-1580822261290-991b38693d1b?w=400&h=300&fit=crop",
        rating: 4.7,
    },
    {
        id: "3",
        name: "Cua hoàng đế",
        price: 350000,
        description: "Cua hoàng đế nướng với bơ tỏi, vỏ giòn, thịt ngọt mềm",
        image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd5e1b2?w=400&h=300&fit=crop",
        rating: 4.9,
    },
    {
        id: "4",
        name: "Rau cải xanh nướng",
        price: 60000,
        description: "Rau cải tươi xanh nướng với nước mắm chua ngọt đặc biệt",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
        rating: 4.5,
    },
    {
        id: "5",
        name: "Mực nướng xả ớt",
        price: 140000,
        description: "Mực tươi nướng với xả ớt, mang hương vị đặc trưng của miền Bắc",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
        rating: 4.6,
    },
    {
        id: "6",
        name: "Tráng miệng sô cô la",
        price: 85000,
        description: "Tráng miệng sô cô la nóng với kem vani, thỏa mãn khẩu vị ngọt",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
        rating: 4.7,
    },
];

export default function FeaturedDishes() {
    return (
        <section id="menu" className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Món ăn nổi bật
                    </h2>
                    <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                        Những món ăn được yêu thích nhất của khách hàng, được chế biến tươi mỗi ngày
                    </p>
                </div>

                {/* Dishes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredDishes.map((dish) => (
                        <div
                            key={dish.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden bg-gray-100">
                                <img
                                    src={dish.image}
                                    alt={dish.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="font-bold text-lg text-gray-900 mb-2">
                                    {dish.name}
                                </h3>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {dish.description}
                                </p>

                                {/* Rating */}
                                {dish.rating && (
                                    <div className="flex items-center gap-1 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={`${i < Math.floor(dish.rating!)
                                                        ? "fill-amber-400 text-amber-400"
                                                        : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                        <span className="text-sm text-gray-600 ml-1">
                                            {dish.rating}
                                        </span>
                                    </div>
                                )}

                                {/* Price */}
                                <div className="flex items-center justify-between">
                                    <span className="text-red-500 font-bold text-lg">
                                        {dish.price.toLocaleString("vi-VN")}₫
                                    </span>
                                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
                                        Thêm vào
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
