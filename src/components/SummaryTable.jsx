import { useNavigate } from "react-router-dom";

export default function SummaryTable({ selected }) {
  const navigate = useNavigate();

  const grouped = {
    mainDishes: selected.filter(d => d.category === "main"),
    sideDishes: selected.filter(d => d.category === "side"),
    desserts: selected.filter(d => d.category === "dessert"),
    drinks: selected.filter(d => d.category === "drink"),
  };

  const saveAndGo = () => {
    localStorage.setItem("ramadanTable", JSON.stringify(grouped));
    navigate("/final");
  };

  return (
    <section className="px-10 py-16">
      <h2 className="font-heading text-3xl text-[#A55B1E] mb-6">
        Your Table Summary
      </h2>

      <div className="bg-white/60 backdrop-blur-md rounded-md p-6 border border-[#A55B1E]/10">
        {selected.length === 0 ? (
          <p className="text-black">No dishes selected yet.</p>
        ) : (
          <ul className="space-y-2 text-black">
            {selected.map((dish) => (
              <li key={dish.id}>{dish.title}</li>
            ))}
          </ul>
        )}

        {selected.length > 0 && (
          <button
            onClick={saveAndGo}
            className="mt-6 bg-[#A55B1E] text-white px-6 py-2 rounded-md hover:scale-105 transition"
          >
            See Final Table
          </button>
        )}
      </div>
    </section>
  );
}