import { dishes } from "../data/dishes";
import FoodCard from "./FoodCard";
import { motion } from "framer-motion";

const CategorySection = ({ title, category, onSelect }) => {
  const filtered = dishes.filter((d) => d.category === category);

  return (
    <motion.section
      className="py-16 px-10"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-heading text-[#D4AF37] mb-10 text-center">
        {title}
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#D4AF37]">
        {filtered.map((dish) => (
          <FoodCard key={dish.id} dish={dish} onSelect={onSelect} />
        ))}
      </div>
    </motion.section>
  );
}

export default CategorySection