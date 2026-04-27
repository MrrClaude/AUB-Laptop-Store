import React, { useContext, useState } from "react";
import ThemeContext from "../context/themeProvder";
import "../StyleCss/animation.css";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";



delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom colored marker for selected store
const selectedIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// ── Your store data — replace with your real locations ──
const stores = [
  {
    id: 1,
    name: "Downtown Branch",
    address: "123 Main Street, City Center",
    phone: "+1 (555) 001-0001",
    hours: "Mon–Sat: 9am – 8pm",
    lat: 11.5564,
    lng: 104.9282,
  },
  {
    id: 3,
    name: "South Park Branch",
    address: "789 Park Road, South District",
    phone: "+1 (555) 003-0003",
    hours: "Mon–Fri: 8am – 6pm",
    lat: 11.5364,
    lng: 104.9482,
  },
  {
    id: 4,
    name: "Airport Branch",
    address: "101 Airport Blvd, Terminal 2",
    phone: "+1 (555) 004-0004",
    hours: "Daily: 6am – 11pm",
    lat: 11.5464,
    lng: 104.8882,
  },
];

// Helper component to fly map to selected store
function FlyToStore({ position }) {
  const map = useMap();
  if (position) {
    map.flyTo(position, 15, { duration: 1.2 });
  }
  return null;
}

const ContactUs = () => {

  const [selectedStore, setSelectedStore] = useState(null);
  const [error, setError] = useState(null);

  const center = [11.5564, 104.9282]; // Default center — set to your city

  const handleSelectStore = (store) => {
    try {
      if (store && store.id) {
        setSelectedStore(store);
        setError(null);
      }
    } catch (err) {
      console.error("Error selecting store:", err);
      setError("Error selecting store. Please try again.");
    }
  };
  const { theme } = useContext(ThemeContext);

  const inputStyles = `w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${theme === "dark"
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
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 mt-4">
          {error}
        </div>
      )}
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
      <motion.section
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
      </motion.section>

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
      {/* Store Locator Map */}
     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 min-h-[800px] sm:min-h-[500px] rounded-2xl overflow-hidden border border-gray-200 font-sans">
      {/* Sidebar */}
      <div className="w-[500px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col  ">
        <div className="px-5 pt-5 pb-3 border-b border-gray-100">
          <h2 className="m-0 text-lg font-bold text-gray-900">Our Stores</h2>
          <p className="mt-1 text-xs text-gray-500">{Array.isArray(stores) ? stores.length : 0} locations near you</p>
        </div>

        <div className="p-3 flex flex-col gap-2">
          {Array.isArray(stores) && stores.map((store) => {
            const isActive = selectedStore?.id === store.id;
            return (
              <div
                key={store.id}
                className={`flex items-start gap-2 p-3 rounded-lg border-[1.5px] cursor-pointer transition-all relative ${
                  isActive ? "border-orange-500 bg-orange-50" : "border-gray-100"
                }`}
                onClick={() => handleSelectStore(store)}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                    <path
                      d="M8 0C3.58 0 0 3.58 0 8c0 5.5 8 12 8 12s8-6.5 8-12c0-4.42-3.58-8-8-8z"
                      fill={isActive ? "#E8613A" : "#888"}
                    />
                    <circle cx="8" cy="8" r="3" fill="white" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 mb-0.5">{store.name}</div>
                  <div className="text-xs text-gray-500 mb-0.5">{store.address}</div>
                  <div className="text-[11px] text-gray-400">{store.hours}</div>
                </div>
                {isActive && <div className="absolute top-2 right-2 text-[10px] font-semibold bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full">Selected</div>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-1 relative z-0 h-[300px] md:h-full md:col-span-2">
        <MapContainer
          center={center}
          zoom={13}
          style={{ width: "100%", height: "100%", zIndex: 0 }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Fly to selected store */}
          {selectedStore && (
            <FlyToStore position={[selectedStore.lat, selectedStore.lng]} />
          )}

          {/* Markers for all stores */}
          {Array.isArray(stores) && stores.map((store) => (
            <Marker
              key={store.id}
              position={[store.lat, store.lng]}
              icon={selectedStore?.id === store.id ? selectedIcon : new L.Icon.Default()}
              eventHandlers={{
                click: () => handleSelectStore(store),
              }}
            >
              <Popup>
                <div className="min-w-[180px] font-sans">
                  <strong className="block text-sm font-bold text-gray-900 mb-1.5">{store.name}</strong>
                  <p className="m-0 mb-1 text-xs text-gray-700">{store.address}</p>
                  <p className="m-0 mb-1 text-xs text-gray-700">{store.phone}</p>
                  <p className="m-0 mb-2 text-xs text-gray-700">{store.hours}</p>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xs font-semibold text-orange-600 no-underline"
                  >
                    Get Directions →
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
    
    <footer
      className={`text-center py-6 ${theme === "dark"
          ? "bg-black text-gray-400"
          : "bg-gray-100 text-gray-700"
        }`}
    >
      <p>&copy; My Company Name ICT</p>
    </footer>
  </div>
  );
};
export default ContactUs;
