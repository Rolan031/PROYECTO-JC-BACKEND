const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    usuarioId: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'El usuario es obligatorio'],
    index: true  // Índice para búsquedas rápidas
},

    juegoId: {
    type: Schema.Types.ObjectId,
    ref: 'Juego',
    required: [true, 'El juego es obligatorio'],
    index: true
},

    // ========== PUNTUACIÓN ==========
    puntuacion: {
    type: Number,
    required: [true, 'La puntuación es obligatoria'],
    min: [1, 'La puntuación mínima es 1 estrella'],
    max: [5, 'La puntuación máxima es 5 estrellas'],
    validate: {
        validator: Number.isInteger,
        message: 'La puntuación debe ser un número entero (1-5)'
    }
},

    // ========== TEXTO DE RESEÑA ==========
    textoReseña: {
    type: String,
    trim: true,
    minlength: [10, 'La reseña debe tener al menos 10 caracteres'],
    maxlength: [2000, 'La reseña no puede exceder 2000 caracteres']
},

    // ========== TÍTULO DE LA RESEÑA ==========
    titulo: {
    type: String,
    trim: true,
    maxlength: [100, 'El título no puede exceder 100 caracteres']
},

    // ========== HORAS JUGADAS ==========
    horasJugadas: {
    type: Number,
    min: [0, 'Las horas no pueden ser negativas'],
    default: 0,
    validate: {
        validator: function (v) {
            // Permite hasta 2 decimales
            return /^\d+(\.\d{1,2})?$/.test(v.toString());
        },
        message: 'Las horas deben tener máximo 2 decimales'
    }
},

    // ========== DIFICULTAD ==========
    dificultad: {
    type: String,
    enum: {
        values: ['Muy Fácil', 'Fácil', 'Normal', 'Difícil', 'Muy Difícil'],
        message: '{VALUE} no es una dificultad válida'
    },
    default: 'Normal'
},

    // ========== RECOMENDACIÓN ==========
    recomendaria: {
    type: Boolean,
    required: true,
    default: true
},

    // ========== ESTADO DEL JUEGO ==========
    estadoJuego: {
    type: String,
    enum: {
        values: ['Jugando', 'Completado', 'Abandonado', 'En pausa', 'Pendiente'],
        message: '{VALUE} no es un estado válido'
    },
    default: 'Completado'
},

    // ========== PLATAFORMA JUGADA ==========
    plataformaJugada: {
    type: String,
    enum: ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X/S',
        'Xbox One', 'Nintendo Switch', 'Steam Deck', 'Móvil', 'Otros']
},
    
}, { timestamps: true });
module.exports = mongoose.model('Review',reviewSchema);