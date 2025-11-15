const express = require('express');
const mongoose = require('mongoose');
const PORT = 3000;
const app = express();
//habilitar json  en nuestro servidor
app.use(express.json);

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
const jugador = require('./jugadores');
const jugadores = require('./jugadores');
app.use((error,req,res,next)=>{
    
    if(error.name === 'ValidationError'){

    }
})

app.get('/hola', (req,res)=>{
   req.paramsñ
});
app.listen(PORT, ()=>{
    console.log('Servidor corriendo en el puerto', PORT)
})