// import { Link } from "react-router-dom";

// export default function FoodCard({ dish, onSelect }) {
//   return (
//     <div className="bg-white/60 backdrop-blur-md rounded-md shadow-md overflow-hidden border border-[#A55B1E]/10">

//       <img
//         src={dish.image}
//         alt={dish.title}
//         className="w-full h-52 object-cover"
//       />

//       <div className="p-4">
//         <h3 className="font-heading text-lg text-[#A55B1E] mb-2">
//           {dish.title}
//         </h3>

//         <div className="flex justify-between items-center mt-3">
//           <button
//             onClick={() => onSelect(dish)}
//             className="text-[#A55B1E] text-2xl hover:scale-110 transition"
//           >
//             <i className='bx bx-plus-circle'></i>
//           </button>

//           <Link
//             to={`/recipe/${dish.id}`}
//             className="bg-[#C39777] text-black px-4 py-1 rounded-md hover:scale-105 transition"
//           >
//             View Recipe
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// } 

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { FaClock, FaTag, FaTrash, FaEye, FaPlus, FaEdit } from "react-icons/fa";

const FoodCard = ({ dish, onDelete, onSelect, onEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleDeleteMeal = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this meal?"
    );

    if (!confirmDelete) return;

    try {
      setIsDeleting(true);
      await deleteDoc(doc(db, "meals", dish.id));
      onDelete(dish.id);
    } catch (error) {
      console.error("Error deleting meal:", error);
      alert("Failed to delete meal. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddToTable = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      setIsAdding(true);
      await new Promise(resolve => setTimeout(resolve, 300)); // Small delay for UX
      onSelect?.(dish);
    } catch (error) {
      console.error("Error adding to table:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onEdit?.(dish);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden relative group border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative overflow-hidden cursor-pointer" onClick={handleEdit}>
        <img
          src={dish.image}
          alt={dish.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5 cursor-pointer" onClick={handleEdit}>
        <h3 className="text-lg font-semibold text-[#A55B1E] mb-2 line-clamp-2">
          {dish.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <FaClock className="text-[#A55B1E]" />
            <span>{dish.time || "N/A"}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaTag className="text-[#A55B1E]" />
            <span className="capitalize">{dish.category}</span>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5">
        <div className="flex items-center justify-between gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToTable}
            disabled={isAdding}
            className="flex-1 bg-gradient-to-r from-[#A55B1E] to-[#8c4c16] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isAdding ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <FaPlus className="text-xs" />
                <span>Add to Table</span>
              </>
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleEdit}
            className="bg-[#C39777] text-black px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#b17e61] transition-colors flex items-center gap-2"
          >
            <FaEdit className="text-xs" />
            <span>Edit</span>
          </motion.button>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleDeleteMeal}
        disabled={isDeleting}
        className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isDeleting ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <FaTrash className="text-xs" />
        )}
      </motion.button>
    </motion.div>
  );
};

export default FoodCard;