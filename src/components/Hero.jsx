import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.section
      className="text-center py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-5xl font-heading text-[#D4AF37] mb-6">
        Create Your Perfect Iftar
      </h1>

      <p className="text-lg text-[#F5F3E7]">
        Choose your dishes and build your Ramadan table ✨
      </p>
    </motion.section>
  )
}

export default Hero