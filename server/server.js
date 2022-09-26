
const express = require('express')
const cors = require('cors')

// Rutas

// Config Base de datos
const {dbConnection} = require('../database/config')

class Server{
  constructor(){
    this.app = express()
    this.port = process.env.PORT

    // Conectar DB
    this.conectarDB()

    this.middlewares()
  }

  async conectarDB(){
    await dbConnection()
  }

  middlewares(){
    // Cors // hay que configurarlo más. Sirve para restringir accesos de url indeseadas
    this.app.use(cors())
    this.app.use(express.static('public'))
  }

  listen(){
    this.app.listen(this.port, ()=> {
      console.log(`Servidor corriendo en puerto ${this.port}`)
    })
  }
}

module.exports = Server;