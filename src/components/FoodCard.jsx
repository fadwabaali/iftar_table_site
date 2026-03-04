import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ dish, onSelect }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="min-w-[260px] bg-[#1C2541] rounded-2xl p-5 shadow-lg transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.6)]"
    >
      <img
        src={dish.image}
        alt={dish.title}
        className="rounded-xl mb-4 h-40 w-full object-cover"
      />

      <h3 className="font-heading text-xl text-[#D4AF37] mb-2">
        {dish.title}
      </h3>

      <p className="text-sm text-gray-300 mb-4">
        ⏱ {dish.time}
      </p>

      <button
        onClick={() => onSelect(dish)}
        className="w-full mb-2 bg-[#D4AF37] text-black py-2 rounded-lg font-medium hover:scale-105 transition"
      >
        Add to Table
      </button>

      <button
        onClick={() => navigate(`/recipe/${dish.id}`)}
        className="w-full border border-[#D4AF37] text-[#D4AF37] py-2 rounded-lg hover:bg-[#D4AF37] hover:text-black transition"
      >
        View Recipe
      </button>
    </motion.div>
  );
}

export default FoodCard