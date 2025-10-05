const mongoose = require('mongoose');
const JugadoresSchema = new mongoose.Schema({
    nickname: {required:[true, 'El nickname es obligatorio'],
        type: String,
        unique: true,
        trim: true,
        minlength: [3, 'El nickname debe tener al menos 3 caracteres'],
        maxlength: [15, 'El nickname debe tener como maximo 15 caracteres']
         },
    juego: { type: String, 
        required: [true, 'El juego es obligatorio'],
        enum:{
        values: ['League of Legends', 'Valorant', 'Fortnite', 'Apex Legends', 'Call of Duty', 'Overwatch', 'Minecraft'],
        message: 'juego no valido'
    } },
    nivel: { type: String, 
        required: true,
        enum:{
            values:['Amateur', 'Semi-Pro', 'Pro', 'Leyenda'],
            message: 'Nivel no valido'
        } },
        pais: { type: String, 
            required: true,
            trim: true
         },   
});
module.exports = mongoose.model('Jugadores', JugadoresSchema);