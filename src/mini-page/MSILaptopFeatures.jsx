import React from "react";
import { motion } from "framer-motion";

const MSILaptopFeatures = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-24">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-accent-purple/10 to-accent-pink/10 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-gradient-to-r from-primary-500/10 to-accent-cyan/10 blur-3xl"></div>
      </div>

      <div className="relative text-center mb-24">
        <motion.span
          className="text-sm font-semibold tracking-wider text-accent-purple"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          WHY CHOOSE OUR PRODUCT?
        </motion.span>
        <motion.h2
          className="text-4xl md:text-6xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-accent-pink to-primary-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          Powerful MSI Laptop Features
        </motion.h2>
        <motion.p
          className="max-w-2xl mx-auto mt-6 text-gray-400 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Experience cutting-edge performance and design with MSI laptops, built
          for gamers and professionals alike.
        </motion.p>
      </div>
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16">
        {msiFeaturesData.map((feature, index) => (
          <Feature key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

const Feature = ({ title, description, icon, tags, animation }) => (
  <motion.div
    className="flex flex-col md:flex-row gap-8 group"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 1 }}
  >
    <div className="flex-shrink-0 relative">
      <div
        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${animation} p-1 animate-float`}
      >
        <div className="w-full h-full bg-dark-800 rounded-xl flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-accent-pink"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={icon}
            />
          </svg>
        </div>
      </div>
      <div className="absolute -z-10 -inset-2 rounded-2xl bg-accent-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <div>
      <motion.h3
        className="text-2xl font-bold mb-3"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="text-gray-400 leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {description}
      </motion.p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className={`px-3 py-1 text-xs font-medium rounded-full ${tag.bgColor}`}
          >
            {tag.text}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const msiFeaturesData = [
  {
    title: "Ultra-Fast Performance",
    description:
      "MSI laptops are equipped with the latest Intel or AMD processors and NVIDIA graphics cards, ensuring smooth and responsive performance for gaming and multitasking.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    tags: [
      { text: "i7/i9", bgColor: "bg-dark-700 text-accent-pink" },
      { text: "RTX", bgColor: "bg-dark-700 text-primary-500" },
      { text: "SSD", bgColor: "bg-dark-700 text-accent-cyan" },
    ],
    animation: "from-accent-pink to-accent-purple",
  },
  {
    title: "Top-tier Display",
    description:
      "MSI laptops feature stunning 4K and high refresh rate displays, offering immersive visuals for gamers and creative professionals alike.",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    tags: [
      { text: "4K", bgColor: "bg-dark-700 text-primary-500" },
      { text: "120Hz", bgColor: "bg-dark-700 text-accent-purple" },
      { text: "OLED", bgColor: "bg-dark-700 text-accent-cyan" },
    ],
    animation: "from-primary-500 to-accent-cyan",
  },
  {
    title: "Customizable RGB Keyboard",
    description:
      "MSI laptops come with customizable RGB keyboards, allowing gamers to personalize their laptop with a range of vibrant colors.",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    tags: [
      { text: "RGB", bgColor: "bg-dark-700 text-accent-purple" },
      { text: "Mechanical", bgColor: "bg-dark-700 text-accent-pink" },
      { text: "Customizable", bgColor: "bg-dark-700 text-primary-500" },
    ],
    animation: "from-accent-purple to-primary-500",
  },
  {
    title: "Superior Cooling Technology",
    description:
      "MSI laptops feature advanced cooling systems to prevent overheating during long gaming sessions, ensuring consistent performance.",
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    tags: [
      { text: "Cooler Boost", bgColor: "bg-dark-700 text-accent-cyan" },
      { text: "High Airflow", bgColor: "bg-dark-700 text-accent-pink" },
      { text: "Silent", bgColor: "bg-dark-700 text-primary-500" },
    ],
    animation: "from-accent-cyan to-primary-500",
  },
  {
    title: "Long Battery Life",
    description:
      "MSI laptops come with long-lasting batteries that provide hours of uninterrupted use, making them perfect for work or play on the go.",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    tags: [
      { text: "10hrs+", bgColor: "bg-dark-700 text-accent-pink" },
      { text: "Fast Charging", bgColor: "bg-dark-700 text-primary-500" },
    ],
  },
  {
    title: "Military-Grade Durability",
    description:
      "MSI laptops are designed to withstand the rigors of everyday use, built to MIL-STD-810G standards for durability and reliability.",
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
    tags: [
      { text: "MIL-STD", bgColor: "bg-dark-700 text-primary-500" },
      { text: "Tough Build", bgColor: "bg-dark-700 text-accent-purple" },
      { text: "Drop Resistant", bgColor: "bg-dark-700 text-accent-pink" },
    ],
    animation: "from-primary-500 to-accent-pink",
  },
];
export default MSILaptopFeatures;
