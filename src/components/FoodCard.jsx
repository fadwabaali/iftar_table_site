import { Link } from "react-router-dom";

export default function FoodCard({ dish, onSelect }) {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-md shadow-md overflow-hidden border border-[#A55B1E]/10">

      <img
        src={dish.image}
        alt={dish.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        <h3 className="font-heading text-lg text-[#A55B1E] mb-2">
          {dish.title}
        </h3>

        <div className="flex justify-between items-center mt-3">
          <button
            onClick={() => onSelect(dish)}
            className="text-[#A55B1E] text-2xl hover:scale-110 transition"
          >
            <i className='bx bx-plus-circle'></i>
          </button>

          <Link
            to={`/recipe/${dish.id}`}
            className="bg-[#C39777] text-black px-4 py-1 rounded-md hover:scale-105 transition"
          >
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
} 