//var MongoClient = require('mongodb').MongoClient

var url = "mongodb://localhost:/agenda_db"

var mongoose = require('mongoose')
var Operaciones = require('./CRUD.js')

mongoose.connect(url)
Operaciones.insertarRegistro((error, result)=>{
    if(error)console.log(error);
    console.log(result);
})