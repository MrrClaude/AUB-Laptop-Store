import React, { useContext } from "react";
import ThemeContext from "../context/themeProvder";
import "../StyleCss/animation.css";
import { motion } from "framer-motion";
const ContactUs = () => {
  const { theme } = useContext(ThemeContext);

  const inputStyles = `w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
    theme === "dark"
      ? "bg-gray-900 border-gray-700 text-white placeholder-gray-400"
      : "bg-white border-gray-300 text-black"
  }`;
  const sectionBg =
    theme === "dark"
      ? "bg-gradient-to-tr from-gray-900 via-gray-950 to-black text-white border-t border-gray-700"
      : "bg-white text-gray-800 border-t border-gray-200 shadow-sm";
  const boxBg =
    theme === "dark"
      ? "bg-gray-900 hover:bg-gray-800"
      : "bg-gray-100 hover:bg-gray-200";

  return (
    <div className={`min-h-screen pt-24 ${sectionBg}`}>
      <header className="text-center py-12 border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-4xl font-bold tracking-wide">Contact Us</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          We’d love to hear from you.
        </p>
      </header>

      {/* Contact Methods */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-screen-xl mx-auto px-4 py-16 "
      >
        <h2 className="text-2xl font-semibold text-center">Get In Touch</h2>
        <p className="mt-4 max-w-xl mx-auto text-center text-gray-600 dark:text-gray-400">
          Choose the method that suits you best.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
          <div className={`${boxBg} p-6 rounded-xl shadow-md transition`}>
            <h3 className="text-lg font-bold">Call Us</h3>
            <p className="mt-2 opacity-70 ">+885: 123 456 7890</p>
          </div>
          <div className={`${boxBg} p-6 rounded-xl shadow-md transition`}>
            <h3 className="text-lg font-bold">Email Us</h3>
            <p className="mt-2 opacity-70">ICT168@gmail.com</p>
          </div>
          <a href="#map">
            <div className={`${boxBg} p-6 rounded-xl shadow-md transition `}>
              <h3 className="text-lg font-bold">Visit Us</h3>
              <p className="mt-2 opacity-70">
                123 Main St,Sensok, Phnom Penh, Cambodia
              </p>
            </div>
          </a>
        </div>
      </motion.section>
      <section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`py-16 ${theme === "dark" ? "bg-gray-950" : "bg-gray-50"}`}
      >
        <div className="max-w-screen-md mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-10">
            Send a Message
          </h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className={inputStyles}
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                className={inputStyles}
              />
            </div>
            <div>
              <label htmlFor="message" className="block font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Write your message..."
                className={inputStyles}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-semibold text-center fadeUp">
          FAQs About MSI Laptops
        </h2>
        <div className="mt-8 grid gap-6 ">
          <div className={`fadeUp ${boxBg} p-5 rounded-xl shadow`}>
            <h3 className="font-semibold text-lg">
              What makes MSI laptops suitable for gaming?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              MSI laptops are equipped with high-performance GPUs (like NVIDIA
              RTX series), fast refresh rate displays, advanced cooling systems,
              and customizable RGB keyboards—making them ideal for competitive
              and immersive gaming.
            </p>
          </div>

          <div className={`fadeUp ${boxBg} p-5 rounded-xl shadow`}>
            <h3 className="font-semibold text-lg">
              Can MSI laptops be used for content creation or productivity?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Absolutely. MSI’s Creator and Prestige series are designed for
              professionals with color-accurate displays, powerful processors,
              and dedicated GPUs—ideal for video editing, 3D rendering, and
              multitasking.
            </p>
          </div>

          <div className={`fadeUp ${boxBg} p-5 rounded-xl shadow`}>
            <h3 className="font-semibold text-lg">
              What kind of warranty and support does MSI offer?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              MSI typically offers a 1-year global warranty on laptops, which
              covers hardware defects. Extended warranty and on-site service
              options may be available depending on your region. 
            </p>
          </div>
        </div>
      </section>
      <footer
        className={`text-center py-6 ${
          theme === "dark"
            ? "bg-black text-gray-400"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        <div
          id="map"
          className="max-w-screen-xl mx-auto my-12 px-4 imageReveal"
        >
          <div
            className={`overflow-hidden rounded-xl transition-shadow duration-300 shadow-2xl border ${
              theme === "dark" ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251843.18708479446!2d104.67764365913189!3d11.579670741420272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513b9946bdfd%3A0x9fc828434b6eb9cf!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1696600067935!5m2!1sen!2skh"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </div>
        </div>

        <p>&copy; My Company Name ICT</p>
      </footer>
    </div>
  );
};

export default ContactUs;
