import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { FaMoon, FaUtensils, FaLeaf, FaIceCream, FaGlassWhiskey, FaPrint, FaShare, FaStar, FaClock, FaUsers, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FinalReview() {
  const [selected, setSelected] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ramadanTable"));
    if (saved) {
      setSelected(saved);
      setTimeout(() => setIsLoaded(true), 500); // Delay for animation
    }
  }, []);

  const mains = selected.mainDishes || [];
  const sides = selected.sideDishes || [];
  const desserts = selected.desserts || [];
  const drinks = selected.drinks || [];

  const totalItems = mains.length + sides.length + desserts.length + drinks.length;

  const handleDeleteMeal = (mealId, category) => {
    setSelected(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      
      if (category === 'main') {
        updated.mainDishes = updated.mainDishes.filter(m => m.id !== mealId);
      } else if (category === 'side') {
        updated.sideDishes = updated.sideDishes.filter(m => m.id !== mealId);
      } else if (category === 'dessert') {
        updated.desserts = updated.desserts.filter(m => m.id !== mealId);
      } else if (category === 'drink') {
        updated.drinks = updated.drinks.filter(m => m.id !== mealId);
      }
      
      localStorage.setItem("ramadanTable", JSON.stringify(updated));
      return updated;
    });
  };

  const renderGridItem = (item, color, icon) => (
    <div
      key={item.id}
      onMouseEnter={() => setHoveredItem(item)}
      onMouseLeave={() => setHoveredItem(null)}
      className="group relative"
    >
      <div
        className={`h-full rounded-3xl ${color} backdrop-blur-md border border-white/50 shadow-lg p-4 flex flex-col justify-between text-white transition-all duration-300 hover:shadow-xl`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl">{icon}</div>
          <div className="text-xs uppercase tracking-[0.2em] opacity-80">{item.category}</div>
        </div>
        <div className="font-semibold text-sm md:text-base leading-tight line-clamp-3 mb-3">
          {item.title}
        </div>
        <div className="text-[11px] md:text-xs opacity-90 line-clamp-2">
          {item.description || "No description available."}
        </div>
        <div className="mt-4 text-[11px] md:text-xs flex items-center gap-2 opacity-90">
          <FaClock className="text-[10px]" />
          {item.time || "N/A"}
        </div>
      </div>
      <button
        onClick={() => handleDeleteMeal(item.id, item.category)}
        className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 duration-200"
        title="Delete from table"
      >
        <FaTrash className="text-sm" />
      </button>
    </div>
  );


  const renderGridSection = (items, color, icon) => {
    if (!items.length) return null;
    return items.map((item) => renderGridItem(item, color, icon));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Ramadan Iftar Table',
        text: `Check out my Ramadan Iftar table with ${totalItems} delicious dishes!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (mains.length === 0 && totalItems === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-white p-12 rounded-2xl shadow-xl max-w-md"
          >
            <FaUtensils className="text-6xl text-[#A55B1E] mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-[#A55B1E] mb-4">
              No Table Found
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't created your Iftar table yet. Go back and add some delicious meals!
            </p>
            <Link
              to="/"
              className="bg-gradient-to-r from-[#A55B1E] to-[#8c4c16] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 inline-flex items-center gap-2"
            >
              <FaUtensils />
              Create My Table
            </Link>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#fefefe] via-[#f8f9fa] to-[#e8f5e8] py-8">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 px-6"
        >
          <div className="inline-block mb-6">
            <FaMoon className="text-6xl text-[#A55B1E] animate-pulse" />
          </div>

          <h1 className="font-heading text-4xl md:text-5xl text-[#A55B1E] mb-4">
            Your Final Ramadan Table
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            A beautiful rectangular arrangement of {totalItems} dishes for your blessed Iftar experience
          </p>

          {/* Stats Cards */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-[#A55B1E]/20"
            >
              <div className="flex items-center gap-2 text-[#A55B1E]">
                <FaUtensils />
                <span className="font-semibold">{totalItems} Dishes</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-[#A55B1E]/20"
            >
              <div className="flex items-center gap-2 text-[#A55B1E]">
                <FaUsers />
                <span className="font-semibold">Family Ready</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-[#A55B1E]/20"
            >
              <div className="flex items-center gap-2 text-[#A55B1E]">
                <FaStar />
                <span className="font-semibold">Ramadan Mubarak</span>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrint}
              className="bg-white text-[#A55B1E] px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 border border-[#A55B1E]/20"
            >
              <FaPrint />
              Print Table
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="bg-gradient-to-r from-[#A55B1E] to-[#8c4c16] text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              <FaShare />
              Share Table
            </motion.button>
          </div>
        </motion.div>

        {/* Rectangular Grid Visualization */}
        <div className="flex justify-center mb-16 px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isLoaded ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="relative w-full max-w-4xl bg-gradient-to-br from-[#A55B1E]/10 to-[#C39777]/10 rounded-2xl border-2 border-[#A55B1E]/20 shadow-[0_0_50px_rgba(165,91,30,0.1)] p-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {renderGridSection(mains, 'bg-gradient-to-br from-[#A55B1E] to-[#8c4c16]', <FaUtensils className="text-lg md:text-xl" />)}
              {renderGridSection(sides, 'bg-gradient-to-br from-green-500 to-green-600', <FaLeaf className="text-lg md:text-xl" />)}
              {renderGridSection(desserts, 'bg-gradient-to-br from-pink-500 to-pink-600', <FaIceCream className="text-lg md:text-xl" />)}
              {renderGridSection(drinks, 'bg-gradient-to-br from-blue-500 to-blue-600', <FaGlassWhiskey className="text-lg md:text-xl" />)}
            </div>

          </motion.div>
        </div>

        {/* Detailed List Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="max-w-6xl mx-auto px-6"
        >
          <h2 className="font-heading text-3xl text-[#A55B1E] text-center mb-8">
            Your Complete Menu
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Main Dishes */}
            {mains.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-[#A55B1E]/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaUtensils className="text-2xl text-[#A55B1E]" />
                  <h3 className="font-semibold text-[#A55B1E]">Main Dishes</h3>
                </div>
                <div className="space-y-3">
                  {mains.map((main, index) => (
                    <div key={index} className="bg-gradient-to-r from-[#A55B1E]/10 to-[#C39777]/10 p-3 rounded-lg">
                      <div className="font-medium">{main.title}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <FaClock className="text-xs" />
                        {main.time}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Side Dishes */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-[#A55B1E]/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaLeaf className="text-2xl text-green-600" />
                <h3 className="font-semibold text-[#A55B1E]">Side Dishes</h3>
              </div>
              <div className="space-y-2">
                {sides.map((side, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                    className="bg-green-50 p-3 rounded-lg"
                  >
                    <div className="font-medium text-sm">{side.title}</div>
                    <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                      <FaClock className="text-xs" />
                      {side.time}
                    </div>
                  </motion.div>
                ))}
                {sides.length === 0 && (
                  <div className="text-gray-500 text-sm italic">No sides selected</div>
                )}
              </div>
            </motion.div>

            {/* Desserts */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-[#A55B1E]/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaIceCream className="text-2xl text-pink-600" />
                <h3 className="font-semibold text-[#A55B1E]">Desserts</h3>
              </div>
              <div className="space-y-2">
                {desserts.map((dessert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                    className="bg-pink-50 p-3 rounded-lg"
                  >
                    <div className="font-medium text-sm">{dessert.title}</div>
                    <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                      <FaClock className="text-xs" />
                      {dessert.time}
                    </div>
                  </motion.div>
                ))}
                {desserts.length === 0 && (
                  <div className="text-gray-500 text-sm italic">No desserts selected</div>
                )}
              </div>
            </motion.div>

            {/* Drinks */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-[#A55B1E]/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaGlassWhiskey className="text-2xl text-blue-600" />
                <h3 className="font-semibold text-[#A55B1E]">Drinks</h3>
              </div>
              <div className="space-y-2">
                {drinks.map((drink, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                    className="bg-blue-50 p-3 rounded-lg"
                  >
                    <div className="font-medium text-sm">{drink.title}</div>
                    <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                      <FaClock className="text-xs" />
                      {drink.time}
                    </div>
                  </motion.div>
                ))}
                {drinks.length === 0 && (
                  <div className="text-gray-500 text-sm italic">No drinks selected</div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </>
  );
}