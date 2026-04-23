// import { dishes } from "../data/dishes";
// import FoodCard from "./FoodCard";

// export default function CategorySection({ title, category, onSelect }) {
//   const filtered = dishes.filter((d) => d.category === category);

//   return (
//     <section className="px-10 py-12">
//       <h2 className="font-heading text-3xl text-[#A55B1E] mb-6">
//         {title}
//       </h2>

//       <div className="flex gap-6 overflow-x-auto pb-4">
//         {filtered.map((dish) => (
//           <div key={dish.id} className="min-w-[250px]">
//             <FoodCard dish={dish} onSelect={onSelect} />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import FoodCard from "./FoodCard";

export default function CategorySection({ title, category, dishes, onSelect, handleDelete, onEdit }) {

  const filtered = dishes.filter(d => d.category === category);

  if (filtered.length === 0) {
    return null; // Don't show empty sections
  }

  return (
    <section className="px-6 md:px-10 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="font-heading text-3xl md:text-4xl text-[#A55B1E]">
            {title}
          </h2>
          <span className="bg-[#A55B1E]/10 text-[#A55B1E] px-3 py-1 rounded-full text-sm font-medium">
            {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((dish) => (
            <FoodCard
              key={dish.id}
              dish={dish}
              onDelete={handleDelete}
              onSelect={onSelect}
              onEdit={onEdit}
            />
          ))}
        </div>
      </div>
    </section>
  );
}