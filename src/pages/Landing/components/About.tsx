export default function About() {
    return (
        <section id="about" className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src="https://images.unsplash.com/photo-1604521270917-15fad713821a?w=500&h=500&fit=crop"
                            alt="Nhà hàng"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Về chúng tôi
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-red-500 mb-2">
                                    Lịch sử
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Với hơn 10 năm kinh nghiệm trong ngành, chúng tôi tự hào là nhà hàng lẩu
                                    cao cấp hàng đầu, phục vụ hàng ngàn khách hàng mỗi năm.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-red-500 mb-2">
                                    Chất lượng nguyên liệu
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Chúng tôi chỉ sử dụng những nguyên liệu tốt nhất từ các nhà cung cấp
                                    tin cậy, đảm bảo độ tươi ngon và an toàn vệ sinh thực phẩm.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-red-500 mb-2">
                                    Cam kết phục vụ
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Đội ngũ nhân viên chuyên nghiệp của chúng tôi sẵn sàng phục vụ bạn
                                    với tác phong tuyệt vời và sự tận tâm cao nhất.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
