import { useContext, useEffect, useRef } from "react";
import ThemeContext from "../context/themeProvder";
import MSILaptopFeatures from "../mini-page/MSILaptopFeatures";
import "../StyleCss/animation.css";
import { Link } from "react-router-dom";
import { Link2 } from "lucide-react";
const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRZQ03VBPkcuVFGvUORHts5b-nJFR-9Gj5FQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpOF89Td-0yRsmWjNz5pzhpjxjcziJ8-YOFw&s",
  "https://i.redd.it/z59df77mnkrb1.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRZQ03VBPkcuVFGvUORHts5b-nJFR-9Gj5FQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpOF89Td-0yRsmWjNz5pzhpjxjcziJ8-YOFw&s",
  "https://i.redd.it/z59df77mnkrb1.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpOF89Td-0yRsmWjNz5pzhpjxjcziJ8-YOFw&s",
];

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const carouselRef = useRef(null);
  const scrollIndex = useRef(0);

  useEffect(() => {
    const carousel = carouselRef.current;

    const interval = setInterval(() => {
      if (!carousel) return;

      const numSlides = images.length;
      scrollIndex.current = (scrollIndex.current + 1) % numSlides;

      const scrollToX = scrollIndex.current * carousel.offsetWidth;
      carousel.scrollTo({ left: scrollToX, behavior: "smooth" });
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full mt-[50px]">
      <div className="relative w-full min-h-screen">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://storage-asset.msi.com/event/vga/2018/dragon_center/images/info01_1.gif"
            alt="Background"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="flex flex-col justify-center items-start h-screen px-6 md:px-20 text-left space-y-6">
          <h1
            className={`text-4xl md:text7-xl font-extrabold ${
              theme === "dark" ? "text-indigo-700" : "text-white"
            }`}
          >
            Discover Premium Laptops <br /> Tailored for You
          </h1>
          <p
            className={`text-lg md:text-xl max-w-xl leading-relaxed ${
              theme === "dark" ? "text-gray-500" : "text-gray-300"
            } `}
          >
            Power meets elegance — explore our latest collection of laptops
            designed for performance, portability, and luxury.
          </p>
          <div className="flex gap-2.5">
            <button
            className={`px-6 py-2 rounded-lg font-semibold transition duration-300
        ${
          theme === "dark"
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
        }
      `}
          >
           <Link to="/gaming">Shop Now</Link>
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-semibold transition duration-300
        ${
          theme === "dark"
           ? " text-white backdrop-blur-md border border-white/40 hover:bg-blue-500/50"
      : " text-white backdrop-blur-md border border-blue-200 hover:bg-blue-500/50"
        }
      `}
          >
           <Link to="/about">Explor Now</Link>
          </button>
          </div>
        </div>
      </div>
      <div
        className={` ${
          theme === "dark"
            ? "border-gray-700 bg-gradient-to-tr from-gray-900 via-gray-950 to-black text-white"
            : "border-gray-200 bg-white text-gray-800 shadow-sm"
        }`}
      >
        <div className="h-full py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-2xl  px-4 md:px-8 h-full">
            <div className="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
              <div className="flex items-center gap-12">
                <h2 className="text-2xl font-bold lg:text-3xl">
                  Laptop Gallery
                </h2>
                <p className="hidden max-w-screen-sm md:block">
                  Explore a collection of modern and classic laptops, showcasing
                  their sleek designs and powerful features.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
              <Link
                 to="/gaming"
                className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80"
              >
                <img
                  src="https://www.pcworld.com/wp-content/uploads/2025/04/alienware-gaming-laptop.jpg?quality=50&strip=all"
                  loading="lazy"
                  alt="Laptop on desk"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                  Gaming Laptop
                </span>
              </Link>
              <Link
                to="/accessories"
                className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80"
              >
                <img
                  src="https://m.media-amazon.com/images/S/aplus-media/vc/8cf8be47-43cf-4674-bbbb-32dcbae7e72c._CR0,0,600,450_PT0_SX600__.jpg"
                  loading="lazy"
                  alt="Laptop keyboard"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                  Accessories
                </span>
              </Link>
              <Link
                to="#"
                className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
              >
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&q=75&fit=crop&w=600"
                  loading="lazy"
                  alt="Laptop and coffee"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                  Everyday Use
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div>
        </div>
        <MSILaptopFeatures />
      </div>
    </div>
  );
};

export default Home;
