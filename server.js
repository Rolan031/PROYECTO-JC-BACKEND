const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Usuario = require('./modelos/usuario');
const usuarioRoutes = require('./routes/usuarioRoutes');
//importando variables de entorno
require('dotenv').config(); 
const PORT = process.env.PORT;
//conexion a la BD en la nube
const uri = 'mongodb+srv://Ponty:123ponty@cluster0.wy0bkfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const ConectarDB = async () =>{
  try{
     await mongoose.connect(uri);
     console.log('Conectado a la BD');
  } catch(error){
    console.error('Error al conectar a la BD', error);
    process.exit(1);
  }
};
ConectarDB();
app.use(express.json());

//Datos simulados
// Array de jugadores (Objetos) del torneo (será nuestra base de datos temporal)
let jugadores = [
    { id: 1, nickname: "DragonSlayer", juego: "League of Legends", nivel: "Pro", pais: "Colombia" },
    { id: 2, nickname: "ShadowNinja", juego: "CS:GO", nivel: "Semi-Pro", pais: "México" },
    { id: 3, nickname: "FireMage", juego: "Valorant", nivel: "Amateur", pais: "Argentina" }
];
//
app.use('/api/usuario',usuarioRoutes)
//1.-Endpoint raíz
app.get('/', (req, res) => {
    res.json({
        titulo: "Bienvenidos a la clase de hoy",
        mensaje: "Hoy vamos a aprender a crear una ruta en Node.js con Express, así que espero que pongan mucha atención para compartirles este plus.",
        recordatorio: "Conéctense y sigan el paso a paso en sus dispositivos",
        profesor: "Kevin",
        fecha: new Date().toLocaleDateString()
    });
});


//2.-Endpoint path
app.get('/path', (req, res) => {
    res.json({ hola: 'path' });
});

//3.-Endpoint path/path2
app.get('/path/path2', (req, res) => {
    res.json({ hola: 'path2' });
});

//4.-Endpoint pathvariable/:valor    ejemplo: pathvariable/1234   o   pathvariable/abcd
app.get('/pathvariable/:valor', (req, res) => {
    let valor = req.params.valor;
    res.json({ pathvariable: valor });
});

//5.-Endpoint pathvariable/:valor/ruta  ejemplo: pathvariable/1234/ruta   o   pathvariable/abcd/ruta
app.get('/pathvariable/:valor/ruta', (req, res) => {
    let valor = req.params.valor;
    res.json({ pathvariable: valor });
});

//6.-Endpoint query   ejemplo: query?nombre=Juan&apellido=Perez
app.get('/query', (req, res) => {
    let nombre = req.query.nombre || 'No enviado';
    let apellido = req.query.apellido || 'No enviado';
    res.json({ nombre: nombre, apellido: apellido });
});

//7.-Endpoint post   (body)   ejemplo: { "nombre": "Juan", "apellido": "Perez" }
app.post('/save', async (req, res) => {
    const{nombre, correo} = req.body
    try{
        const usuario = await Usuario.create({nombre, correo});
        res.status(200).json(usuario);
    } catch(error){
        res.status(400).json({message: error.message});
    }
});


//8.-Endpoint put   (body y path variable)   ejemplo: pathvariable/1234   body: { "nombre": "Juan", "apellido": "Perez" }
app.put('/update/:id', (req, res) => {
    let id = req.params.id;
    let nombre = req.body.nombre || 'No enviado';
    let apellido = req.body.apellido || 'No enviado';
    res.json({ id: id, nombre: nombre, apellido: apellido });
});

//9.-Endpoint delete   (path variable)   ejemplo: pathvariable/1234
app.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    res.json({ id: id });
});

app.listen(PORT, () => {
    console.log('Escuchando servidor en el puerto', PORT);
});
