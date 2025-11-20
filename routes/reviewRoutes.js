const express = require('express');
const router = express.Router();

const { 
  getReviews, 
  getReview,
  crearReview,
  eliminarReview,
  updateReview
} = require('../controllers/reviewController');

// Obtener todas las reviews (opcionalmente filtradas por juego ?juegoId=...)
router.get('/', getReviews);
// Obtener una review
router.get('/:id', getReview);
// Crear una review
router.post('/', crearReview);
// Eliminar una review
router.delete('/:id', eliminarReview);
// Actualizar una review
router.put('/:id', updateReview);

module.exports = router;