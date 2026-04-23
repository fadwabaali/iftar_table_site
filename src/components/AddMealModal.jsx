import { useState, useEffect } from "react";
import { db } from "../firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaUtensils, FaLeaf, FaIceCream, FaGlassWhiskey, FaEdit } from "react-icons/fa";

export default function AddMealModal({ close, onMealAdded, isEdit = false, mealToEdit = null, onMealUpdated }) {

  const [form, setForm] = useState({
    title: "",
    category: "main",
    image: "",
    time: "",
    description: "",
    recipe: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Pre-populate form when editing
  useEffect(() => {
    if (isEdit && mealToEdit) {
      setForm({
        title: mealToEdit.title || "",
        category: mealToEdit.category || "main",
        image: mealToEdit.image || "",
        time: mealToEdit.time || "",
        description: mealToEdit.description || "",
        recipe: mealToEdit.recipe || ""
      });
    }
  }, [isEdit, mealToEdit]);

  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.image.trim()) newErrors.image = "Image URL is required";
    if (!form.time.trim()) newErrors.time = "Cooking time is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.recipe.trim()) newErrors.recipe = "Recipe is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      if (isEdit && mealToEdit) {
        // Update existing meal
        const mealRef = doc(db, "meals", mealToEdit.id);
        await updateDoc(mealRef, form);

        const updatedMeal = {
          id: mealToEdit.id,
          ...form
        };

        onMealUpdated?.(updatedMeal);
      } else {
        // Add new meal
        const docRef = await addDoc(collection(db, "meals"), form);

        const newMeal = {
          id: docRef.id,
          ...form
        };

        onMealAdded(newMeal);
      }

      close();
    } catch (error) {
      console.error("Error saving meal:", error);
      alert("Could not save meal. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        onClick={close}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-to-r from-[#A55B1E] to-[#8c4c16] text-white p-6">
            <h2 className="text-2xl font-heading font-semibold flex items-center gap-2">
              {isEdit ? <FaEdit className="text-3xl" /> : <FaPlus className="text-3xl" />}
              {isEdit ? "Edit Meal" : "Add New Meal"}
            </h2>
          </div>

          <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meal Title *
                </label>
                <input
                  name="title"
                  value={form.title}
                  placeholder="e.g., Chicken Biryani"
                  onChange={handleChange}
                  className={`w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#A55B1E]/20 focus:border-[#A55B1E] transition-colors`}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#A55B1E]/20 focus:border-[#A55B1E] transition-colors"
                >
                  <option value="main">Main Dish</option>
                  <option value="side">Side Dish</option>
                  <option value="dessert">Dessert</option>
                  <option value="drink">Drink</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL *
                </label>
                <input
                  name="image"
                  value={form.image}
                  placeholder="https://example.com/image.jpg"
                  onChange={handleChange}
                  className={`w-full border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#A55B1E]/20 focus:border-[#A55B1E] transition-colors`}
                />
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                {form.image && (
                  <div className="mt-3">
                    <img
                      src={form.image}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg border"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cooking Time *
                </label>
                <input
                  name="time"
                  value={form.time}
                  placeholder="e.g., 45 minutes"
                  onChange={handleChange}
                  className={`w-full border ${errors.time ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#A55B1E]/20 focus:border-[#A55B1E] transition-colors`}
                />
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  placeholder="Brief description of the meal..."
                  onChange={handleChange}
                  rows={3}
                  className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#A55B1E]/20 focus:border-[#A55B1E] transition-colors resize-none`}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipe Instructions *
                </label>
                <textarea
                  name="recipe"
                  value={form.recipe}
                  placeholder="Step-by-step cooking instructions..."
                  onChange={handleChange}
                  rows={4}
                  className={`w-full border ${errors.recipe ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#A55B1E]/20 focus:border-[#A55B1E] transition-colors resize-none`}
                />
                {errors.recipe && <p className="text-red-500 text-sm mt-1">{errors.recipe}</p>}
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={close}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-[#A55B1E] to-[#8c4c16] text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <FaUtensils className="text-lg" />
                    <span>{isEdit ? "Update Meal" : "Add Meal"}</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}