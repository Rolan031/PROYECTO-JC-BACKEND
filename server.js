const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const gameRoutes = require('./routes/gameRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
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
//Endpoints

app.use(cors());
app.use(express.json());

app.use('/api/game',gameRoutes)
//2.-Endpoint path
app.use('/api/review',reviewRoutes);

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
