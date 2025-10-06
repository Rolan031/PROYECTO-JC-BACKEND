const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gamesSchema = new Schema(
{
 titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],  // Mensaje personalizado
    trim: true,           // Elimina espacios en blanco al inicio/fin
    maxlength: 100        // Límite de caracteres
  },
  
  genero: {
    type: String,
    enum: {
      values: ['Acción', 'RPG', 'Estrategia', 'Aventura', 'Deportes', 'Terror', 'Puzzle','Shooter'],
      message: '{VALUE} no es un género válido'  // Mensaje de error personalizado
    },
    required: true
  },
  
  plataforma: {
    type: String,
    enum: ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X/S', 'Xbox One', 'Nintendo Switch', 'Movil', 'PlayStation 2', 'PlayStation 3', 'Xbox 360'],
    required: true
  },
  
  añoLanzamiento: {
    type: Number,
    min: [1970, 'El año debe ser 1970 o posterior'],
    max: [new Date().getFullYear() + 2, 'Solo puedes colocar juegos que ya hayan sido lanzados'],
    required: true
  },
  
  desarrollador: {
    type: String,
    trim: true,
    maxlength: 100
  },
  
  imagenPortada: {
    type: String,
    trim: true,
    default: null,        // Valor por defecto si no se proporciona
    validate: {           // Validación personalizada
      validator: function(v) {
        // Verifica que sea una URL válida (opcional)
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Debe ser una URL válida'
    }
  },
  
  descripcion: {
    type: String,
    maxlength: 2000,
    trim: true
  },
  
  completado: {
    type: Boolean,
    default: false        // Por defecto no está completado
  },
  progreso:{
    type: Number,
    required: true
  },
  
  fechaCreacion: {
    type: Date,
    default: Date.now     // Se asigna automáticamente la fecha actual
  },
  UltimaVezJugado:{
    type: Date,
    default: null
  }
}, {
  timestamps: true        // Agrega automáticamente createdAt y updatedAt
});
module.exports = mongoose.model('Game', gamesSchema); 