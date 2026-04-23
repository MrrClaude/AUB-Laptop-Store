import React, { useContext,useEffect } from "react";
import ThemeContext from "../context/themeProvder";
import { FaBolt, FaCogs, FaPalette } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../StyleCss/animation.css";
import { Link } from "react-router-dom";
const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const AboutUs = () => {
  const { theme } = useContext(ThemeContext);
   const controlsStory = useAnimation();
  const [refStory, inViewStory] = useInView({
    threshold: 0.3
  });

  useEffect(() => {
    if (inViewStory) {
      controlsStory.start("visible");
    } else {
      controlsStory.start("hidden");
    }
  }, [controlsStory, inViewStory]);

  return (
    <div
      className={`mt-[50px] ${
        theme === "dark"
          ? "bg-gradient-to-tr from-gray-900 via-gray-950 to-black text-white border-t border-gray-700"
          : "bg-white text-gray-800 border-t border-gray-200 shadow-sm"
      }`}
    >
      <header className="bg-gradient-to-r from-dark to-primary-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={sectionVariant}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            About MSI Laptops
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={sectionVariant}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90"
          >
            Powering your gaming and productivity with cutting-edge technology and sleek design
          </motion.p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        {/* Our Story */}
        <motion.section
          ref={refStory}
          initial="hidden"
          animate={controlsStory}
          variants={sectionVariant}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-dark mb-6">Our Story</h2>
              <p className="text-gray-500 mb-4">
                MSI has been a leader in high-performance laptops since 1986, specializing in gaming, content creation, and business.
              </p>
              <p className="text-gray-500 mb-4">
                Our laptops combine powerful processors, top-tier graphics, and innovative cooling solutions to deliver unmatched performance.
              </p>
              <p className="text-gray-500">
                Designed for gamers, creators, and professionals who demand reliability and speed without compromise.
              </p>
            </div>
            <div className="md:w-1/2">
              <motion.img
                src="https://sm.pcmag.com/t/pcmag_me/photo/default/msi-thm_2esy.1920.jpg"
                alt="MSI Laptop"
                className="rounded-lg shadow-xl w-full h-auto object-cover object-center transition duration-300 hover:scale-110"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inViewStory ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
        </motion.section>

        {/* Our Mission */}
        <motion.section
          className="bg-primary-50 rounded-xl p-12 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="text-center max-w-4xl mx-auto ">
            <h2 className="text-3xl font-bold text-dark mb-6 imageReveal" >Our Mission</h2>
            <p className="text-xl text-gray-700 mb-8 imagereveal">
              "To empower users worldwide with laptops that deliver exceptional performance, innovative design, and immersive experiences."
            </p>
            <div className="flex flex-wrap justify-center gap-8 ">
              {[FaBolt, FaCogs, FaPalette].map((Icon, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white p-6 rounded-lg shadow-md w-full sm:w-64 transition duration-300 hover:scale-110 fadeUp"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={idx * 0.2}
                >
                  <div
                    className={`mb-4 flex justify-center ${
                      theme === "dark" ? "text-indigo-700" : "text-black"
                    }`}
                  >
                    <Icon className="text-3xl" />
                  </div>
                  <h3 className="font-bold text-dark mb-2 text-black">
                    {["High Performance", "Innovative Cooling", "Stunning Displays"][idx]}
                  </h3>
                  <p className="text-gray-600">
                    {
                      [
                        "Equipped with the latest CPUs and GPUs for smooth multitasking and gaming.",
                        "Advanced thermal systems to keep your laptop cool under pressure.",
                        "High refresh rates and vibrant colors for immersive visuals."
                      ][idx]
                    }
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Our Team */}
        <motion.section
          className="mb-20 imageReveal"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl font-bold text-dark mb-12 text-center">
            Meet Our Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {[{
              name: "John Cena",
              role: "CEO & Founder",
              desc: "Visionary leader driving MSI's innovation in gaming laptops.",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRejU8SoN5k6If2I6YoJ7Qyh-dMcOoLYij_iUmmzXFA7u9lWJinqec3RoKEM1pyGIhYlRH_dpgRPy7hS8k-x7wIBMDTw281VExtHgg_yQ"
            }, {
              name: "Preab Sovath",
              role: "Chief Technology Officer",
              desc: "Expert in hardware engineering and thermal design for high performance.",
              img: "https://i.pinimg.com/736x/5c/64/cc/5c64cc7d2e3ec0ecb97d5dbd6d2f73bf.jpg"
            }, {
              name: "Eno",
              role: "Chief Marketing Officer",
              desc: "Strategist behind MSI's global brand presence.",
              img: "https://d3e6ckxkrs5ntg.cloudfront.net/artists/images/2928316/original/crop:x0y0w1562h1468/hash:1467372381/1390385258_454547061313137_1607547435_o.jpg?1467372381"
            }].map((person, idx) => (
              <motion.div
                key={idx}
                className={`rounded-lg shadow-md overflow-hidden ${
                  theme === "dark" ? "bg-gray-900" : "bg-white"
                }`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx * 0.2}
              >
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-full h-64 object-cover object-center transition duration-300 hover:scale-120"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl text-dark mb-1">
                    {person.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-3">
                    {person.role}
                  </p>
                  <p className="text-gray-600">{person.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        <motion.section
          className={`rounded-xl p-12 mb-20 imageReveal ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-200"
          }`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "45+", label: "Years in Industry" },
              { value: "150+", label: "Patents Granted" },
              { value: "10M+", label: "Laptops Sold" },
              { value: "99%", label: "Customer Satisfaction" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx * 0.2}
              >
                <div className="text-5xl font-bold text-primary-400 mb-2 text-indigo-700">
                  {stat.value}
                </div>
                <div className="opacity-50">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="bg-gradient-to-r from-primary-500 to-secondary-600 rounded-xl p-12 text-center fadeUp"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl font-bold mb-6">Experience the MSI Advantage</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover how MSI laptops can elevate your gaming and productivity to the next level.
          </p>
          <Link to="/gaming"
            className={`text-primary-600 font-bold px-8 py-3 rounded-lg transition duration-300 shadow-lg ${
              theme === "dark"
                ? "bg-indigo-900 hover:bg-gray-200"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Shop Now
          </Link>
        </motion.section>
      </main>
    </div>
  );
};

export default AboutUs;
