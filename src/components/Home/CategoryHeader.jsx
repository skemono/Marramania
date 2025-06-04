import { motion } from "motion/react"

function CategoryHeader({ title, showFavoritesOnly }) {
  return (
    <motion.div 
      className="py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold">{title}</h1>
        {showFavoritesOnly && (
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
            ❤️ Favoritos
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default CategoryHeader;