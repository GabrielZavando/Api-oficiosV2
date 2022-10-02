
const express = require('express')
const cors = require('cors')

// Rutas
const usuarios = require('../routes/usuarios')
const emprendimientos = require('../routes/emprendimientos')

// Config Base de datos
const {dbConnection} = require('../database/config')

class Server{
  constructor(){
    this.app = express()
    this.port = process.env.PORT

    // Conectar DB
    this.conectarDB()

    this.middlewares()

    this.routes()
  }

  async conectarDB(){
    await dbConnection()
  }

  middlewares(){
    // Cors // hay que configurarlo más. Sirve para restringir accesos de url indeseadas
    this.app.use(cors())

    // Lectura y parseo del body
    this.app.use(express.json())

    // Directorio público
    this.app.use(express.static('public'))
  }

  routes(){
    this.app.use('/api/v1/usuarios', usuarios)
    this.app.use('/api/v1/emprendimientos', emprendimientos)
  }

  listen(){
    this.app.listen(this.port, ()=> {
      console.log(`Servidor corriendo en puerto ${this.port}`)
    })
  }
}

module.exports = Server;