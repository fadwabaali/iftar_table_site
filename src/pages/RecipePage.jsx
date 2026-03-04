import { useParams } from "react-router-dom";
import { dishes } from "../data/dishes";
import { motion } from "framer-motion";

const RecipePage = () => {
  const { id } = useParams();
  const dish = dishes.find((d) => d.id === parseInt(id));

  if (!dish) return <p>Dish not found</p>;

  return (
    <motion.div
      className="min-h-screen p-10 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-4xl font-heading text-[#D4AF37] mb-6">
        {dish.title}
      </h1>

      <img
        src={dish.image}
        alt={dish.title}
        className="mx-auto rounded-xl mb-6 w-[400px]"
      />

      <p className="mb-6 max-w-2xl mx-auto text-gray-300">
        {dish.description}
      </p>

      <div className="bg-[#1C2541] p-6 rounded-xl max-w-2xl mx-auto text-left whitespace-pre-line">
        {dish.recipe}
      </div>
    </motion.div>
  );
}

export default RecipePage