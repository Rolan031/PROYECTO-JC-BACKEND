const express = require('express');
const router = express.Router();

const { getReviews, getReview} = require('../controllers/reviewController');
//Obtener todos las revies
router.get('/',getReviews)
//Obtener un game 
router.get('/:id',getReview)
//Crear un game
// router.post('/',crearReview)
//Eliminar un game
// router.delete('/:id',eliminarReview)
//Update un game
// router.put('/:id',updateReview)
module.exports = router;