const express = require('express');
const router = express.Router();
//Obtener todos los usuarios
router.get('/',(req,res) =>{
    res.json('Ruta de usuarios');
})
//Obtener un usuario 
router.get('/:id',(req,res) =>{
    res.json({mssg: 'Get a single user'})
})
//Crear un usuario
router.post('/',(req,res)=>{
    res.json({mssg: 'Crear un usuario'})
})
//Eliminar un usuario
router.delete('/:id',(req,res)=>{
    res.json({mssg: 'Eliminar usuario'})
})
//Update un usuario
router.put('/:id',(req,res)=>{
    res.json({mssg: 'Update un usuario'})
})
module.exports = router;