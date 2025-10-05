const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: true
    }
    ,correo:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email address']
    }
},{timestamps: true})

module.exports = mongoose.model('Usuario', usuarioSchema);