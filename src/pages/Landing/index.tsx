import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedDishes from "./components/FeaturedDishes";
import Categories from "./components/Categories";
import About from "./components/About";
import WhyChooseUs from "./components/WhyChooseUs";
import Reviews from "./components/Reviews";
import Promotions from "./components/Promotions";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export const LandingPage = () => {
  return (
    <div className="w-full">
      <Header />
      <Hero />
      <FeaturedDishes />
      <Categories />
      <About />
      <WhyChooseUs />
      <Reviews />
      <Promotions />
      <CTA />
      <Footer />
    </div>
  );
};
