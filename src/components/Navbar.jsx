// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="backdrop-blur-md bg-white/40 border-b border-[#A55B1E]/20 px-10 py-4 flex justify-between items-center">
//       <Link to="/" className="font-heading text-2xl text-[#A55B1E]">
//         Iftar Planner
//       </Link>

//       <Link
//         to="/final"
//         className="bg-[#C39777] text-black px-5 py-2 rounded-md hover:scale-105 transition"
//       >
//         Final Review
//       </Link>
//     </nav>
//   );
//}

import { Link } from "react-router-dom";

export default function Navbar({ clearTable }) {

  return (
    <nav className="backdrop-blur-md bg-white/40 border-b border-[#A55B1E]/20 px-10 py-4 flex justify-between items-center">

      <Link to="/" className="font-heading text-2xl text-[#A55B1E]">
        Iftar Planner
      </Link>

      <div className="flex gap-4">

        <button
        onClick={clearTable}
        className="border pointer px-4 py-2 rounded">
          Clear Table
        </button>

        <Link
        to="/final"
        className="bg-[#C39777] pointer text-black px-5 py-2 rounded-md">
          Final Review
        </Link>

      </div>

    </nav>
  );
}