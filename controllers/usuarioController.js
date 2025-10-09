const Usuario = require('../modelos/usuario');
const mongoose = require('mongoose');

//get all users
const getUsuarios = async (req, res) =>{
    const usuarios = await Usuario.find({}).sort({createdAt: -1});
    res.status(200).json(usuarios)
}

//get user by id
const getUsuario = async (req, res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'usuario inexistente'})
    }
    const usuario = await Usuario.findById(id)
    if(!usuario){
        return res.status(404).json({error: 'Usuario no encontrado'})
    }
    res.status(200).json(usuario)
}

//create user
const crearUsuario = async (req, res) => {
    const { nombre, correo } = req.body
    //añadir registro a la BD
    try {
        const usuario = await Usuario.create({ nombre, correo });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//delete user
const eliminarUsuario = async(req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'usuario inexistente'})
    }
    const usuario = await Usuario.findOneAndDelete({_id: id})
    res.status(200).json(usuario)
}

//update user
const updateUsuario = async(req,res) =>{
    const {id} = req.params
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'usuario inexistente'})
    }
    const usuario = await Usuario.findOneAndUpdate({_id: id},{
        ...req.body
    })
    if(!usuario){
        return res.status(404).json({error: 'Usuario no encontrado'})
    }
    res.status(200).json(usuario)
}

module.exports = {
    crearUsuario,
    getUsuarios,
    getUsuario,
    eliminarUsuario,
    updateUsuario
}