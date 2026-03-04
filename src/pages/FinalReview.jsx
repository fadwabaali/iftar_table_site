import { useEffect, useState } from "react";

export default function FinalReview() {
  const [selected, setSelected] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ramadanTable"));
    if (saved) setSelected(saved);
  }, []);

  const main = selected.mainDishes?.[0];
  const sides = selected.sideDishes || [];
  const desserts = selected.desserts || [];
  const drinks = selected.drinks || [];

  const renderOrbit = (items, radius) => {
    if (!items.length) return null;

    const angleStep = (2 * Math.PI) / items.length;

    return items.map((item, index) => {
      const angle = index * angleStep;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      return (
        <div
          key={index}
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
          }}
        >
          <div className="w-24 h-24 rounded-full bg-white/80 backdrop-blur-md border border-[#A55B1E] flex items-center justify-center text-sm text-black text-center shadow-md">
            {item.title}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20">

      <h1 className="font-heading text-4xl text-[#A55B1E] mb-16">
        Your Final Ramadan Table 🌙
      </h1>

      <div className="relative w-[700px] h-[700px]">

        <div className="absolute inset-0 rounded-full bg-white/50 backdrop-blur-md border border-[#A55B1E]/20 shadow-[0_0_100px_rgba(165,91,30,0.2)]"></div>

        {main && (
          <div
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            }}
          >
            <div className="w-48 h-48 rounded-full bg-[#A55B1E] text-white flex items-center justify-center text-lg font-bold shadow-xl">
              {main.title}
            </div>
          </div>
        )}

        {renderOrbit(sides, 200)}
        {renderOrbit(desserts, 300)}
        {renderOrbit(drinks, 380)}

      </div>
    </div>
  );
}