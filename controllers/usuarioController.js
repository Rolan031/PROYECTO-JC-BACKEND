const Game = require('../modelos/game');
const mongoose = require('mongoose');

//get all games
const getJuegos = async (req, res) =>{
    const Juegos = await Game.find({}).sort({createdAt: -1});
    res.status(200).json(Juegos)
}

//get game by id
const getGame = async (req, res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'game inexistente'})
    }
    const game = await Game.findById(id)
    if(!game){
        return res.status(404).json({error: 'Game no encontrado'})
    }
    res.status(200).json(game)
}

//create game
const crearGame = async (req, res) => {
    const { titulo, genero, plataforma, añoLanzamiento, desarrollador, imagenPortada, descripcion, completado, progreso } = req.body
    //añadir registro a la BD
    try {
        const game = await Game.create({ titulo, genero, plataforma, añoLanzamiento, desarrollador, imagenPortada, descripcion, completado, progreso });
        res.status(200).json(game);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//delete game
const eliminarGame = async(req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'game inexistente'})
    }
    const game = await Game.findOneAndDelete({_id: id})
    res.status(200).json(game)
}

//update game
const updateGame = async(req,res) =>{
    const {id} = req.params
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'game inexistente'})
    }
    const game = await Game.findOneAndUpdate({_id: id},{
        //Los puntos representan los campos q se llevan, aqui tres porque hay 3 campos
        ...req.body
    })
    if(!game){
        return res.status(404).json({error: 'Game no encontrado'})
    }
    res.status(200).json(game)
}

module.exports = {
    crearGame,
    getJuegos,
    getGame,
    eliminarGame,
    updateGame
}