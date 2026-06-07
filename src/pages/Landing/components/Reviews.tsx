import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Review {
    id: string;
    name: string;
    avatar: string;
    content: string;
    rating: number;
}

const reviews: Review[] = [
    {
        id: "1",
        name: "Nguyễn Thị Hương",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        content: "Quán ăn rất tuyệt vời, món ăn ngon tươi, nhân viên phục vụ rất tốt. Mình sẽ quay lại nhiều lần!",
        rating: 5,
    },
    {
        id: "2",
        name: "Trần Văn Anh",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        content: "Hệ thống gọi món điện tử rất tiện lợi. Món ăn được chế biến nhanh chóng và ngon miệng.",
        rating: 5,
    },
    {
        id: "3",
        name: "Phạm Minh Châu",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        content: "Không gian sang trọng, thích hợp cho các bữa tiệc gia đình. Giá cả hợp lý!",
        rating: 4.5,
    },
    {
        id: "4",
        name: "Lê Tuấn Anh",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        content: "Thịt bò Wagyu quá ngon, mềm và có hương vị tuyệt vời. Recommended!",
        rating: 5,
    },
    {
        id: "5",
        name: "Võ Thị Thanh",
        avatar: "https://images.unsplash.com/photo-1535307671918-4ff4c4a7d5e9?w=100&h=100&fit=crop",
        content: "Dịch vụ chuyên nghiệp, trang bị hiện đại. Rất hài lòng với trải nghiệm ở đây!",
        rating: 4.8,
    },
    {
        id: "6",
        name: "Đặng Hoàng Nam",
        avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop",
        content: "Hải sản tươi sống, được nấu nóng hổi. Quả là một trải nghiệm tuyệt vời!",
        rating: 5,
    },
];

export default function Reviews() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? reviews.length - 3 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev >= reviews.length - 3 ? 0 : prev + 1));
    };

    const visibleReviews = reviews.slice(currentIndex, currentIndex + 3);

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Đánh giá khách hàng
                    </h2>
                    <p className="text-gray-700 text-lg">
                        Nghe nhận xét từ những khách hàng hài lòng
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {visibleReviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={`${i < Math.floor(review.rating)
                                                ? "fill-amber-400 text-amber-400"
                                                : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-gray-700 mb-6 line-clamp-4">
                                "{review.content}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={review.avatar}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {review.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Khách hàng
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={goToPrevious}
                        className="w-12 h-12 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center justify-center"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={goToNext}
                        className="w-12 h-12 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center justify-center"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
}
