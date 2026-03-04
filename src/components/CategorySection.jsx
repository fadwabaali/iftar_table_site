import { dishes } from "../data/dishes";
import FoodCard from "./FoodCard";

export default function CategorySection({ title, category, onSelect }) {
  const filtered = dishes.filter((d) => d.category === category);

  return (
    <section className="px-10 py-12">
      <h2 className="font-heading text-3xl text-[#A55B1E] mb-6">
        {title}
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {filtered.map((dish) => (
          <div key={dish.id} className="min-w-[250px]">
            <FoodCard dish={dish} onSelect={onSelect} />
          </div>
        ))}
      </div>
    </section>
  );
}