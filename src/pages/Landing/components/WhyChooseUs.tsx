import { Zap, Utensils, Users, Clock, CreditCard, Eye } from "lucide-react";

interface Benefit {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const benefits: Benefit[] = [
    {
        icon: <Zap className="w-8 h-8" />,
        title: "Nguyên liệu tươi mỗi ngày",
        description: "Cập nhật nguyên liệu mới hàng ngày đảm bảo độ tươi ngon tuyệt vời",
    },
    {
        icon: <Utensils className="w-8 h-8" />,
        title: "Đặt món nhanh chóng",
        description: "Hệ thống gọi món điện tử giúp bạn đặt món nhanh chóng và thuận tiện",
    },
    {
        icon: <Users className="w-8 h-8" />,
        title: "Phục vụ chuyên nghiệp",
        description: "Đội nhân viên được đào tạo chuyên nghiệp, tận tâm với khách hàng",
    },
    {
        icon: <Clock className="w-8 h-8" />,
        title: "Không gian hiện đại",
        description: "Thiết kế sang trọng, hiện đại, thích hợp cho mọi dịp",
    },
    {
        icon: <CreditCard className="w-8 h-8" />,
        title: "Thanh toán tiện lợi",
        description: "Hỗ trợ nhiều phương thức thanh toán an toàn và nhanh chóng",
    },
    {
        icon: <Eye className="w-8 h-8" />,
        title: "Theo dõi thời gian thực",
        description: "Theo dõi trạng thái đơn hàng và tiến độ chế biến real-time",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Tại sao chọn chúng tôi?
                    </h2>
                    <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                        Chúng tôi cung cấp dịch vụ tốt nhất với giá cạnh tranh
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 text-red-500 rounded-xl mb-6">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
