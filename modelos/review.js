const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  // Usuario opcional por ahora (reseñas anónimas)
  usuarioId: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: false,
    index: true
  },

  juegoId: {
    type: Schema.Types.ObjectId,
    ref: 'Game', // nombre del modelo de juegos
    required: [true, 'El juego es obligatorio'],
    index: true
  },

  // ========== TEXTO DE RESEÑA ==========
  textoReseña: {
    type: String,
    trim: true,
    minlength: [10, 'La reseña debe tener al menos 10 caracteres'],
    maxlength: [2000, 'La reseña no puede exceder 2000 caracteres']
  }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);