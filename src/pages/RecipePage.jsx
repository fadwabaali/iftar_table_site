import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const RecipePage = () => {

  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchDish = async () => {
      try {
        const docRef = doc(db, "meals", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDish({ id: docSnap.id, ...docSnap.data() });
        } else {
          setDish(null);
        }

      } catch (error) {
        console.error("Error fetching dish:", error);
      }

      setLoading(false);
    };

    fetchDish();

  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black">
        Loading recipe...
      </div>
    );
  }

  if (!dish) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black">
        Dish not found
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <motion.div
        className="min-h-screen px-6 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-md rounded-md shadow-lg border border-[#A55B1E]/10 overflow-hidden">

          {/* IMAGE */}
          <img
            src={dish.image}
            alt={dish.title}
            className="w-full h-[420px] object-cover"
          />

          {/* CONTENT */}
          <div className="p-8">

            <h1 className="text-4xl font-heading text-[#A55B1E] mb-6">
              {dish.title}
            </h1>

            <p className="text-black mb-6 leading-relaxed">
              {dish.description}
            </p>

            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-md border border-[#A55B1E]/10 text-black whitespace-pre-line">
              {dish.recipe}
            </div>

          </div>

        </div>
      </motion.div>
    </>
  );
};

export default RecipePage;