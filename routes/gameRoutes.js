const express = require('express');
const router = express.Router();
const {
    crearGame,
    getJuegos,
    getGame,
    eliminarGame,
    updateGame
} = require('../controllers/usuarioController');
//Obtener todos los Juegos
router.get('/',getJuegos)
//Obtener un game 
router.get('/:id',getGame)
//Crear un game
router.post('/',crearGame)
//Eliminar un game
router.delete('/:id',eliminarGame)
//Update un game
router.put('/:id',updateGame)
module.exports = router;