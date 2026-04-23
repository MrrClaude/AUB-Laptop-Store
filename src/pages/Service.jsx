import React, { useContext, useEffect } from "react";
import ThemeContext from "../context/themeProvder";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaMicrochip,
  FaFan,
  FaShieldAlt,
  FaTools,
  FaSyncAlt,
} from "react-icons/fa";
import { TbDeviceGamepad2 } from "react-icons/tb";

// ======================
// Animation Variants
// ======================
const fadeLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// ======================
// Hook: Scroll Animation
// ======================
const useScrollAnimation = (threshold = 0.3) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold });
  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);
  return { ref, controls };
};

// ======================
// Component
// ======================
const Service = () => {
  const { theme } = useContext(ThemeContext);

  const sectionBg =
    theme === "dark"
      ? "bg-gradient-to-tr from-gray-900 via-gray-950 to-black text-white"
      : "bg-white text-gray-800";
  const cardBg =
    theme === "dark"
      ? "bg-gray-900 text-gray-300"
      : "bg-gray-100 text-gray-800";
  const textGray = theme === "dark" ? "text-gray-400" : "text-gray-600";

  // Each section animation trigger
  const titleAnim = useScrollAnimation(0.2);
  const section1Anim = useScrollAnimation(0.3);
  const section2Anim = useScrollAnimation(0.3);
  const gridAnim = useScrollAnimation(0.2);

  return (
    <section className={`w-full mx-auto mt-[70px] py-10 ${sectionBg}`}>
      {/* Title */}
      <motion.div
        ref={titleAnim.ref}
        initial="hidden"
        animate={titleAnim.controls}
        variants={fadeUp}
        className="pb-3 text-center"
      >
        <h1 className="text-5xl font-bold tracking-wide">Services</h1>
        <p className={`mt-2 text-lg ${textGray}`}>
          Professional MSI Laptop Care & Performance Upgrades
        </p>
      </motion.div>

      {/* Section 1 */}
      <motion.div
        ref={section1Anim.ref}
        initial="hidden"
        animate={section1Anim.controls}
        variants={fadeLeft}
        className="xl:w-[80%] sm:w-[85%] w-[90%] mx-auto flex flex-col md:flex-row gap-8 items-center mt-16"
      >
        <motion.img
          variants={fadeLeft}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 150 }}
          src="https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/655cc6bdab8550001c9e9244.jpg"
          alt="Gaming Laptop Optimization"
          className="rounded-2xl shadow-lg w-full max-w-md object-cover h-60"
        />
        <motion.div variants={fadeRight} className={`${cardBg} p-6 rounded-xl`}>
          <h2 className="text-3xl font-bold">Gaming Laptop Optimization</h2>
          <p className="mt-4 leading-relaxed">
            We optimize MSI gaming laptops with GPU tuning, fan calibration,
            BIOS updates, and thermal repasting for maximum performance and
            stability.
          </p>
        </motion.div>
      </motion.div>

      {/* Section 2 */}
      <motion.div
        ref={section2Anim.ref}
        initial="hidden"
        animate={section2Anim.controls}
        variants={fadeRight}
        className="xl:w-[80%] sm:w-[85%] w-[90%] mx-auto flex flex-col-reverse md:flex-row gap-8 items-center mt-16"
      >
        <motion.div variants={fadeLeft} className={`${cardBg} p-6 rounded-xl`}>
          <h2 className="text-3xl font-bold">Repair & Upgrade Services</h2>
          <p className="mt-4 leading-relaxed">
            From SSD and RAM upgrades to display and keyboard replacements — we
            ensure your MSI laptop performs like new.
          </p>
        </motion.div>
        <motion.img
          variants={fadeRight}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 150 }}
          src="https://s.alicdn.com/@sc04/kf/Hfdeec34f8680427ca24c3f9c842335ea5.jpg"
          alt="Repair & Upgrade"
          className="rounded-2xl shadow-lg w-full max-w-md object-cover h-60"
        />
      </motion.div>

      {/* Services Grid */}
      <motion.section
        ref={gridAnim.ref}
        variants={staggerContainer}
        initial="hidden"
        animate={gridAnim.controls}
        className={`py-16 mt-10 ${sectionBg}`}
      >
        <div className="px-4 mx-auto max-w-7xl">
          <motion.h2
            variants={fadeUp}
            className="text-center text-4xl font-bold mb-10"
          >
            MSI Laptop Services
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <FaMicrochip />,
                title: "Performance Upgrades",
                desc: "Upgrade RAM, SSD, or GPU for top-tier gaming and content creation.",
              },
              {
                icon: <FaFan />,
                title: "Thermal Cleaning",
                desc: "Prevent overheating with professional fan cleaning and paste replacement.",
              },
              {
                icon: <FaShieldAlt />,
                title: "Warranty & Protection",
                desc: "Certified part replacements and protection plans.",
              },
              {
                icon: <FaTools />,
                title: "Hardware Repair",
                desc: "Keyboard, display, and motherboard-level repair services.",
              },
              {
                icon: <FaSyncAlt />,
                title: "System Optimization",
                desc: "BIOS and driver tuning for lightning-fast performance.",
              },
              {
                icon: <TbDeviceGamepad2 />,
                title: "Gaming Setup",
                desc: "RGB lighting, Dragon Center, and game-specific performance profiles.",
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  boxShadow:
                    theme === "dark"
                      ? "0px 8px 20px rgba(255,255,255,0.08)"
                      : "0px 8px 20px rgba(0,0,0,0.1)",
                }}
                transition={{ type: "spring", stiffness: 120 }}
                className={`p-8 rounded-2xl flex flex-col items-center justify-center text-center gap-5 ${cardBg} hover:cursor-pointer transition-transform duration-300`}
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-purple-400 to-pink-300 text-black text-3xl mb-6 transform-hover">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className={`${textGray} text-base`}>{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </section>
  );
};

export default Service;
