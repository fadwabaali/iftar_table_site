import { FaMoon, FaStar, FaUtensils, FaClock, FaUsers } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative text-center py-24 px-6 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl text-[#A55B1E]">
          <FaMoon />
        </div>
        <div className="absolute top-20 right-20 text-4xl text-[#A55B1E]">
          <FaStar />
        </div>
        <div className="absolute bottom-10 left-1/4 text-5xl text-[#A55B1E]">
          <FaMoon />
        </div>
        <div className="absolute bottom-20 right-10 text-3xl text-[#A55B1E]">
          <FaStar />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-block mb-6">
          <FaMoon className="text-6xl text-[#A55B1E] animate-pulse" />
        </div>

        <h1 className="font-heading text-5xl md:text-6xl text-[#A55B1E] mb-6 leading-tight">
          Create Your Perfect
          <span className="block text-[#8c4c16]">Iftar Table</span>
        </h1>

        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          Choose your main dish, sides, desserts, and drinks.
          Build your Ramadan table beautifully with our curated collection of traditional and modern Iftar meals.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex items-center gap-2 text-[#A55B1E] bg-[#A55B1E]/10 px-4 py-2 rounded-full">
            <FaUtensils className="text-lg" />
            <span className="font-medium">Curated Meals</span>
          </div>
          <div className="flex items-center gap-2 text-[#A55B1E] bg-[#A55B1E]/10 px-4 py-2 rounded-full">
            <FaClock className="text-lg" />
            <span className="font-medium">Quick Prep</span>
          </div>
          <div className="flex items-center gap-2 text-[#A55B1E] bg-[#A55B1E]/10 px-4 py-2 rounded-full">
            <FaUsers className="text-lg" />
            <span className="font-medium">Family Friendly</span>
          </div>
        </div>
      </div>
    </section>
  );
}