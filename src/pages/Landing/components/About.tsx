export default function About() {
    return (
        <section id="about" className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Image */}
                    <div className="relative aspect-[4/3] md:aspect-square overflow-hidden rounded-2xl bg-gray-50 shadow-lg">
                        <img
                            src="/logo.png"
                            alt="Dexlure"
                            className="h-full w-full object-contain p-8 md:p-10"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Về Dexlure
                        </h2>

                        <p className="text-gray-700 leading-relaxed mb-6">
                            Dexlure mang đến trải nghiệm ẩm thực trọn vẹn với
                            những món ăn được chế biến từ nguyên liệu tươi ngon,
                            không gian ấm cúng và đội ngũ phục vụ tận tâm.
                        </p>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-red-500 mb-2">
                                    Hành trình ẩm thực
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Từ những ngày đầu, Dexlure luôn theo đuổi mục
                                    tiêu mang hương vị đậm đà, tươi mới đến
                                    từng bàn ăn. Hơn 10 năm qua, nhà hàng đã trở
                                    thành điểm hẹn quen thuộc của hàng ngàn thực
                                    khách.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-red-500 mb-2">
                                    Chất lượng nguyên liệu
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Chúng tôi chọn lọc nguyên liệu từ những nhà
                                    cung cấp uy tín, ưu tiên độ tươi ngon và an
                                    toàn vệ sinh thực phẩm trong từng món ăn.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-red-500 mb-2">
                                    Cam kết phục vụ
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Đội ngũ nhân viên chuyên nghiệp luôn sẵn
                                    sàng lắng nghe và phục vụ, mang đến cho bạn
                                    một bữa ăn trọn vẹn và đáng nhớ.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
