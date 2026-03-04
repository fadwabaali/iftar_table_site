import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import SummaryTable from "../components/SummaryTable";
import Footer from "../components/Footer";

export default function Home() {
  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem("iftarTable");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("iftarTable", JSON.stringify(selected));
  }, [selected]);

  const handleSelect = (dish) => {
    if (!selected.find((d) => d.id === dish.id)) {
      setSelected([...selected, dish]);
    }
  };

  return (
    <>
      <Navbar />
      <Hero />
      <CategorySection title="Main Dishes" category="main" onSelect={handleSelect} />
      <CategorySection title="Side Dishes" category="side" onSelect={handleSelect} />
      <CategorySection title="Desserts" category="dessert" onSelect={handleSelect} />
      <CategorySection title="Drinks" category="drink" onSelect={handleSelect} />
      <SummaryTable selected={selected} />
      <Footer />
    </>
  );
}