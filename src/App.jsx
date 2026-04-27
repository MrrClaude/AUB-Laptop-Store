import React, { useContext } from "react";
import Navbar from "./component/Navbar";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Footer from "./component/Footer";
import ThemeContext from "./context/themeProvder";
import Service from "./pages/Service";
import Gaming from "./ProductPages/Gaming";
import PaymentPage from "./component/PaymentPage";
import Page500 from "./pages/Page500";
import Accessories from "./ProductPages/Accessories";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme} relative`  }>
      <nav>
        <Navbar />
      </nav>
      <main className="h-[100%]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/gaming" element={<Gaming />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/service" element={<Service />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/page500" element={<Page500 />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
