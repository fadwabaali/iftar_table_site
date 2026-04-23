import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUtensils, FaLeaf, FaIceCream, FaGlassWhiskey, FaMoon, FaCheck, FaArrowRight } from "react-icons/fa";

export default function SummaryTable({ selected }) {
  const navigate = useNavigate();

  const grouped = {
    mainDishes: selected.filter(d => d.category === "main"),
    sideDishes: selected.filter(d => d.category === "side"),
    desserts: selected.filter(d => d.category === "dessert"),
    drinks: selected.filter(d => d.category === "drink"),
  };

  const totalItems = selected.length;

  const saveAndGo = () => {
    localStorage.setItem("ramadanTable", JSON.stringify(grouped));
    navigate("/final");
  };

  if (totalItems === 0) {
    return (
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#A55B1E]/5 to-[#C39777]/5 rounded-2xl p-12 border border-[#A55B1E]/10">
            <FaUtensils className="text-6xl mb-6 text-[#A55B1E]" />
            <h2 className="font-heading text-3xl text-[#A55B1E] mb-4">
              Your Table is Empty
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Start building your perfect Iftar table by adding meals from the categories above.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <FaUtensils className="text-[#A55B1E]" />
                <span>Main Dishes</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <FaLeaf className="text-[#A55B1E]" />
                <span>Side Dishes</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <FaIceCream className="text-[#A55B1E]" />
                <span>Desserts</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <FaGlassWhiskey className="text-[#A55B1E]" />
                <span>Drinks</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 md:px-10 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-[#A55B1E] to-[#8c4c16] text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-2xl mb-1">
                  Your Iftar Table
                </h2>
                <p className="text-white/80">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} selected
                </p>
              </div>
              <FaMoon className="text-4xl text-white" />
            </div>
          </div>

          <div className="p-6">
            {Object.entries(grouped).map(([category, items]) => {
              if (items.length === 0) return null;

              const categoryIcons = {
                mainDishes: <FaUtensils className="text-2xl" />,
                sideDishes: <FaLeaf className="text-2xl" />,
                desserts: <FaIceCream className="text-2xl" />,
                drinks: <FaGlassWhiskey className="text-2xl" />
              };

              const categoryTitles = {
                mainDishes: "Main Dishes",
                sideDishes: "Side Dishes",
                desserts: "Desserts",
                drinks: "Drinks"
              };

              return (
                <div key={category} className="mb-6 last:mb-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{categoryIcons[category]}</span>
                    <h3 className="font-semibold text-[#A55B1E] text-lg">
                      {categoryTitles[category]}
                    </h3>
                    <span className="bg-[#A55B1E]/10 text-[#A55B1E] px-2 py-1 rounded-full text-xs font-medium">
                      {items.length}
                    </span>
                  </div>

                  <div className="grid gap-2">
                    {items.map((dish) => (
                      <motion.div
                        key={dish.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={dish.image}
                            alt={dish.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{dish.title}</h4>
                            <p className="text-sm text-gray-600">{dish.time}</p>
                          </div>
                        </div>
                        <div className="text-[#A55B1E] font-medium flex items-center gap-1">
                          <FaCheck className="text-sm" />
                          Added
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={saveAndGo}
              className="w-full bg-gradient-to-r from-[#A55B1E] to-[#8c4c16] text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 mt-6 flex items-center justify-center gap-2"
            >
              <span>View Final Table</span>
              <FaArrowRight className="text-lg" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}