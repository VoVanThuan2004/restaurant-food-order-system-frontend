import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer id="contact" className="bg-gray-900 text-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">H</span>
                            </div>
                            <span className="font-bold text-xl text-white">HaiDiLao</span>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Nhà hàng lẩu cao cấp, nơi mang đến trải nghiệm ẩm thực tuyệt vời.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-white mb-4 text-lg">Liên hệ</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin size={20} className="text-red-500 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-gray-400">
                                        123 Đường Đinh Bộ Lĩnh<br />
                                        Quận Hoàn Kiếm, Hà Nội
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone size={20} className="text-red-500 flex-shrink-0" />
                                <a
                                    href="tel:+842434567890"
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    (024) 3456 7890
                                </a>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail size={20} className="text-red-500 flex-shrink-0" />
                                <a
                                    href="mailto:info@hadilao.vn"
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    info@hadilao.vn
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-white mb-4 text-lg">Menu nhanh</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#home"
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    Trang chủ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#menu"
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    Thực đơn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#about"
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    Về chúng tôi
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#promotions"
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    Khuyến mãi
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="font-bold text-white mb-4 text-lg">Theo dõi chúng tôi</h3>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 pt-8">
                    <p className="text-center text-gray-400">
                        &copy; {new Date().getFullYear()} HaiDiLao Restaurant. Tất cả quyền được bảo lưu.
                    </p>
                </div>
            </div>
        </footer>
    );
}
