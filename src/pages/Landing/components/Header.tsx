import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const menuItems = [
        { label: "Trang chủ", href: "#home" },
        { label: "Thực đơn", href: "#menu" },
        { label: "Khuyến mãi", href: "#promotions" },
        { label: "Giới thiệu", href: "#about" },
        { label: "Liên hệ", href: "#contact" },
    ];

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">H</span>
                    </div>
                    <span className="font-bold text-xl text-gray-900">HaiDiLao</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => scrollToSection(item.href)}
                            className="text-gray-700 hover:text-red-500 transition-colors duration-300 font-medium"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Login Button */}
                <div className="hidden md:block">
                    <button
                        onClick={() => navigate("/login")}
                        className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 font-medium cursor-pointer"
                    >
                        Đăng nhập
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-3">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => scrollToSection(item.href)}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            {item.label}
                        </button>
                    ))}
                    <button
                        onClick={() => navigate("/login")}
                        className="w-full px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-medium"
                    >
                        Đăng nhập
                    </button>
                </div>
            )}
        </header>
    );
}
