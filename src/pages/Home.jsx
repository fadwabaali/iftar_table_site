// import { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import CategorySection from "../components/CategorySection";
// import SummaryTable from "../components/SummaryTable";
// import Footer from "../components/Footer";

// export default function Home() {
//   const [selected, setSelected] = useState(() => {
//     const saved = localStorage.getItem("iftarTable");
//     return saved ? JSON.parse(saved) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("iftarTable", JSON.stringify(selected));
//   }, [selected]);

//   const handleSelect = (dish) => {
//     if (!selected.find((d) => d.id === dish.id)) {
//       setSelected([...selected, dish]);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <Hero />
//       <CategorySection title="Main Dishes" category="main" onSelect={handleSelect} />
//       <CategorySection title="Side Dishes" category="side" onSelect={handleSelect} />
//       <CategorySection title="Desserts" category="dessert" onSelect={handleSelect} />
//       <CategorySection title="Drinks" category="drink" onSelect={handleSelect} />
//       <SummaryTable selected={selected} />
//       <Footer />
//     </>
//   );
// }

import { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import SummaryTable from "../components/SummaryTable";
import AddMealModal from "../components/AddMealModal";
import Footer from "../components/Footer";

import { db } from "../firebase";
import { collection,getDocs } from "firebase/firestore";

export default function Home(){

const [dishes,setDishes]=useState([]);
const [selected,setSelected]=useState([]);
const [showModal,setShowModal]=useState(false);

useEffect(()=>{

const fetchMeals=async()=>{
const querySnapshot=await getDocs(collection(db,"meals"));

const meals=querySnapshot.docs.map(doc=>({
id:doc.id,
...doc.data()
}));


setDishes(meals);
};

fetchMeals();

},[]);

const handleMealAdded = (meal) => {
  setDishes((prev) => [meal, ...prev]);
};

const handleSelect=(dish)=>{
if(!selected.find(d=>d.id===dish.id)){
setSelected([...selected,dish]);
}
};

const clearTable=()=>{
setSelected([]);
localStorage.removeItem("iftarTable");
};

return(

<>
<Navbar clearTable={clearTable}/>

<Hero/>

<div className="flex justify-center mb-10">

<button
onClick={()=>setShowModal(true)}
className="bg-[#A55B1E] text-white px-6 py-2 rounded">
Add Meal
</button>

</div>

<CategorySection
title="Main Dishes"
category="main"
dishes={dishes}
onSelect={handleSelect}
/>

<CategorySection
title="Side Dishes"
category="side"
dishes={dishes}
onSelect={handleSelect}
/>

<CategorySection
title="Desserts"
category="dessert"
dishes={dishes}
onSelect={handleSelect}
/>

<CategorySection
title="Drinks"
category="drink"
dishes={dishes}
onSelect={handleSelect}
/>

<SummaryTable selected={selected}/>

<Footer/>

{showModal && (
  <AddMealModal
    close={() => setShowModal(false)}
    onMealAdded={handleMealAdded}
  />
)}

</>

);

}