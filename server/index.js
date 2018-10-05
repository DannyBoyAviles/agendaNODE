const http = require('http'),
      path = require('path'),
      Routing = require('./rutas.js'),
      express = require('express'),
      session = require('express-session')
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');
 
const PORT = 3000
const app = express()

const Server = http.createServer(app)

mongoose.connect('mongodb://localhost:27017/agenda_db', { useNewUrlParser: true }) //se agrega el asugundo parametro entre {} al usar mongoose >=4


app.use(express.static('client'))
app.use(bodyParser.json())
app.use(session({secret:'This is Secret'}))
app.use(bodyParser.urlencoded({ extended: true}))
//app.use('/users', Routing)//por seguridad se define users/ como la ruta que me ayudara a acceder a las sub rutas definidas en el archivo rutas.js que son almacenadas en el Objeto Routing. users/ es como decir... yoQuiero/laruta/
app.use(Routing); // se puede utilizar solo esta linea y borrar la anterior

Server.listen(PORT, function() {
  console.log('Server is listeng on port: ' + PORT)
})