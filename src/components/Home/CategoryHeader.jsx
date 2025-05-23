// src/components/Home/CategoryHeader.jsx
import { motion } from "motion/react"

function CategoryHeader({ title }) {
  return (
    <motion.div 
      className="py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold">{title}</h1>
    </motion.div>
  );
}

export default CategoryHeader;