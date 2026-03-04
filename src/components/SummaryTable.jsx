import { useEffect, useState } from "react"

export default function SummaryTable() {
  const [selected, setSelected] = useState({})

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ramadanTable"))
    if (saved) setSelected(saved)
  }, [])

  const main = selected.mainDishes?.[0]
  const sides = selected.sideDishes || []
  const desserts = selected.desserts || []
  const drinks = selected.drinks || []

  const renderOrbit = (items, radius, size = "w-20 h-20") => {
    if (!items.length) return null

    const angleStep = (2 * Math.PI) / items.length

    return items.map((item, index) => {
      const angle = index * angleStep
      const x = radius * Math.cos(angle)
      const y = radius * Math.sin(angle)

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
          <div className={`${size} rounded-full border-2 border-yellow-400 bg-[#1e293b] flex items-center justify-center text-xs text-center px-2 shadow-lg`}>
            {item.title}
          </div>
        </div>
      )
    })
  }

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center py-20 overflow-hidden">

      <h1 className="text-4xl font-bold text-yellow-400 mb-16">
        Your Ramadan Table 🌙
      </h1>

      <div className="relative w-[650px] h-[650px]">

        {/* Glowing Table */}
        <div className="absolute inset-0 rounded-full bg-[#1e293b] shadow-[0_0_120px_rgba(212,175,55,0.3)]"></div>

        {/* Main Dish Center */}
        {main && (
          <div
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            }}
          >
            <div className="w-40 h-40 rounded-full bg-yellow-500 text-black flex items-center justify-center text-lg font-bold shadow-2xl animate-pulse">
              {main.title}
            </div>
          </div>
        )}

        {/* Orbit Rings */}
        {renderOrbit(sides, 170)}
        {renderOrbit(desserts, 260)}
        {renderOrbit(drinks, 340)}

      </div>
    </div>
  )
}