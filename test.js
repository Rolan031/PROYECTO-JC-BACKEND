const mongoose = require('mongoose');
const express = require('express');
const app = express();
const uri = 'mongodb+srv://Ponty:123ponty@cluster0.wy0bkfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
