import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/layouts/landing/Header";
import Hero from "./components/Hero";
import FeaturedDishes from "./components/FeaturedDishes";
import About from "./components/About";
import WhyChooseUs from "./components/WhyChooseUs";
import Reviews from "./components/Reviews";
import Promotions from "./components/Promotions";
import CTA from "./components/CTA";
import Footer from "../../components/layouts/landing/Footer";
import BackToTop from "../../components/BackToTop";

export const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = decodeURIComponent(location.hash.slice(1));
    const target = document.getElementById(id);
    if (!target) return;

    const frame = requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth" });
    });

    return () => cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  return (
    <div className="w-full">
      <Header />
      <Hero />
      <FeaturedDishes />
      <About />
      <WhyChooseUs />
      <Reviews />
      <Promotions />
      <CTA />
      <Footer />

      <BackToTop />
    </div>
  );
};
