import { Link } from "react-router-dom";
import { FaMoon, FaClipboardList } from "react-icons/fa";

export default function Navbar( ) {

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-[#A55B1E]/20 px-6 md:px-10 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <Link to="/" className="font-heading text-2xl md:text-3xl text-[#A55B1E] hover:text-[#8c4c16] transition-colors flex items-center gap-2">
          <FaMoon className="text-3xl" />
          Iftar Planner
        </Link>

        <div className="flex gap-3">
          <Link
            to="/final"
            className="bg-gradient-to-r from-[#C39777] to-[#b17e61] text-black px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm md:text-base flex items-center gap-2"
          >
            <FaClipboardList className="text-lg" />
            Final Review
          </Link>
        </div>

      </div>
    </nav>
  );
}