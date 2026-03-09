import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function AddMealModal({ close, onMealAdded }) {

  const [form, setForm] = useState({
    title: "",
    category: "main",
    image: "",
    time: "",
    description: "",
    recipe: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {

    const docRef = await addDoc(collection(db, "meals"), form);

    const newMeal = {
      id: docRef.id,
      ...form
    };

    onMealAdded(newMeal); // instant UI update
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white p-8 rounded-md w-[420px]">

        <h2 className="text-2xl text-[#A55B1E] mb-4">
          Add New Meal
        </h2>

        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <select
          name="category"
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        >
          <option value="main">Main</option>
          <option value="side">Side</option>
          <option value="dessert">Dessert</option>
          <option value="drink">Drink</option>
        </select>

        <input
          name="image"
          placeholder="Paste Image URL"
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        {/* IMAGE PREVIEW */}
        {form.image && (
          <img
            src={form.image}
            alt="preview"
            className="w-full h-40 object-cover rounded mb-3"
          />
        )}

        <input
          name="time"
          placeholder="Cooking Time"
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <textarea
          name="recipe"
          placeholder="Recipe"
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <div className="flex gap-3 mt-4">

          <button
            onClick={handleSubmit}
            className="bg-[#A55B1E] text-white px-4 py-2 rounded"
          >
            Save Meal
          </button>

          <button
            onClick={close}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}