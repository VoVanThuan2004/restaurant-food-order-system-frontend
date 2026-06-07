import { Beef, Fish, Leaf, Wine, Cake } from "lucide-react";

interface Category {
    id: string;
    name: string;
    icon: React.ReactNode;
}

const categories: Category[] = [
    {
        id: "1",
        name: "Thịt bò",
        icon: <Beef className="w-12 h-12" />,
    },
    {
        id: "2",
        name: "Hải sản",
        icon: <Fish className="w-12 h-12" />,
    },
    {
        id: "3",
        name: "Rau củ",
        icon: <Leaf className="w-12 h-12" />,
    },
    {
        id: "4",
        name: "Đồ uống",
        icon: <Wine className="w-12 h-12" />,
    },
    {
        id: "5",
        name: "Tráng miệng",
        icon: <Cake className="w-12 h-12" />,
    },
];

export default function Categories() {
    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Danh mục món ăn
                    </h2>
                    <p className="text-gray-700 text-lg">
                        Khám phá các danh mục đa dạng
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-sm"
                        >
                            <div className="flex justify-center mb-4 text-red-500">
                                {category.icon}
                            </div>
                            <h3 className="font-semibold text-gray-900">
                                {category.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
