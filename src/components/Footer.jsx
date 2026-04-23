import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#1B1A17] text-white py-8">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-semibold text-[#F8E4D1] mb-3">Iftar Kitchen</h3>
            <p className="text-sm text-gray-300 leading-6">
              Discover delicious Iftar meals, add favorites to your table, and keep your Ramadan menu organized.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">Quick links</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Home</li>
              <li>Categories</li>
              <li>Recipes</li>
              <li>My Table</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Iftar Kitchen. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer