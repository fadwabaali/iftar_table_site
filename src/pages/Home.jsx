import { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import SummaryTable from "../components/SummaryTable";
import AddMealModal from "../components/AddMealModal";
import Footer from "../components/Footer";

import { db } from "../firebase";
import { collection,getDocs } from "firebase/firestore";
import { FaUtensils } from "react-icons/fa";

export default function Home(){

const [dishes,setDishes]=useState([]);
const [selected,setSelected]=useState([]);
const [showModal,setShowModal]=useState(false);
const [loading,setLoading]=useState(true);
const [error,setError]=useState(null);
const [editingMeal,setEditingMeal]=useState(null);

useEffect(()=>{

const fetchMeals=async()=>{
try {
  setLoading(true);
  setError(null);
  const querySnapshot=await getDocs(collection(db,"meals"));

  const meals=querySnapshot.docs.map(doc=>({
  id:doc.id,
  ...doc.data()
  }));

  setDishes(meals);
} catch (err) {
  console.error("Error fetching meals:", err);
  setError("Failed to load meals. Please try again.");
} finally {
  setLoading(false);
}
};

fetchMeals();

},[]);

const handleMealAdded = (meal) => {
  setDishes((prev) => [meal, ...prev]);
};

const handleDelete = (id) => {
  setDishes((prev) => prev.filter((dish) => dish.id !== id));
};

const handleEdit = (meal) => {
  setEditingMeal(meal);
  setShowModal(true);
};

const handleMealUpdated = (updatedMeal) => {
  setDishes((prev) => prev.map((dish) => 
    dish.id === updatedMeal.id ? updatedMeal : dish
  ));
  setEditingMeal(null);
};

const handleSelect=(dish)=>{
if(!selected.find(d=>d.id===dish.id)){
setSelected([...selected,dish]);
}
};

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A55B1E] mx-auto mb-4"></div>
        <p className="text-[#A55B1E] font-medium">Loading your Iftar menu...</p>
      </div>
    </div>
  );
}

if (error) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Oops!</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#A55B1E] text-white px-6 py-2 rounded-lg hover:bg-[#8c4c16] transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

return(

<>
<Navbar/>

<Hero/>

<div className="flex justify-center mb-12">
<button
onClick={()=>setShowModal(true)}
className="bg-gradient-to-r from-[#A55B1E] to-[#8c4c16] text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
  <span>+</span>
  Add New Meal
</button>
</div>

{dishes.length === 0 ? (
  <div className="text-center py-16">
    <FaUtensils className="text-6xl mb-4 text-[#A55B1E]" />
    <h3 className="text-2xl font-semibold text-[#A55B1E] mb-2">No meals yet!</h3>
    <p className="text-gray-600 mb-6">Start building your Iftar menu by adding your first meal.</p>
    <button
      onClick={()=>setShowModal(true)}
      className="bg-[#A55B1E] text-white px-6 py-2 rounded-lg hover:bg-[#8c4c16] transition-colors"
    >
      Add Your First Meal
    </button>
  </div>
) : (
  <>
<CategorySection
title="Main Dishes"
category="main"
dishes={dishes}
onSelect={handleSelect}
handleDelete={handleDelete}
onEdit={handleEdit}
/>

<CategorySection
title="Side Dishes"
category="side"
dishes={dishes}
onSelect={handleSelect}
handleDelete={handleDelete}
onEdit={handleEdit}
/>

<CategorySection
title="Desserts"
category="dessert"
dishes={dishes}
onSelect={handleSelect}
handleDelete={handleDelete}
onEdit={handleEdit}
/>

<CategorySection
title="Drinks"
category="drink"
dishes={dishes}
onSelect={handleSelect}
handleDelete={handleDelete}
onEdit={handleEdit}
/>
  </>
)}

<SummaryTable selected={selected}/>

<Footer/>

{showModal && (
  <AddMealModal
    close={() => {
      setShowModal(false);
      setEditingMeal(null);
    }}
    onMealAdded={handleMealAdded}
    onMealUpdated={handleMealUpdated}
    isEdit={!!editingMeal}
    mealToEdit={editingMeal}
  />
)}

</>

);

}