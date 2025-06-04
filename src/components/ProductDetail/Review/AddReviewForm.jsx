import { useState } from 'react';
import { motion } from "motion/react";
import StarRating from './StarRating';

function AddReviewForm({ productId, onAddReview }) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    
    setIsSubmitting(true);
    
    const newReview = {
      id: Date.now(),
      productId,
      name: name.trim(),
      date: new Date().toISOString().split('T')[0],
      rating,
      comment: comment.trim(),
    };
    
    await onAddReview(newReview);
    setName('');
    setComment('');
    setRating(5);
    setIsSubmitting(false);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="bg-gray-50 p-6 rounded-lg mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-semibold mb-4">Agregar Reseña</h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />
  
        <div>
          <label className="block text-sm font-medium mb-2">Calificación:</label>
          <StarRating rating={rating} setRating={setRating} />
        </div>
        
        <textarea
          placeholder="Tu comentario"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 border rounded-lg h-24 resize-none"
          required
        />
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Reseña'}
        </button>
      </div>
    </motion.form>
  );
}

export default AddReviewForm;