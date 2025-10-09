const express = require('express');
const router = express.Router();
const {
    crearUsuario,
    getUsuarios,
    getUsuario,
    eliminarUsuario,
    updateUsuario
} = require('../controllers/usuarioController');
//Obtener todos los usuarios
router.get('/',getUsuarios)
//Obtener un usuario 
router.get('/:id',getUsuario)
//Crear un usuario
router.post('/',crearUsuario)
//Eliminar un usuario
router.delete('/:id',eliminarUsuario)
//Update un usuario
router.put('/:id',updateUsuario)
module.exports = router;