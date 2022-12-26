
import cors from 'cors'
import express from 'express'


// Rutas
import { routeCategorias } from '../routes/categorias.js'
import { routeEmprendimientos } from '../routes/emprendimientos.js'
import { routeUsuarios } from '../routes/usuarios.js'

// Config Base de datos
import { dbConnection } from '../database/config.js'

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
    this.app.use('/api/v1/usuarios', routeUsuarios)
    this.app.use('/api/v1/categorias', routeCategorias)
    this.app.use('/api/v1/emprendimientos', routeEmprendimientos)
  }

  listen(){
    this.app.listen(this.port, ()=> {
      console.log(`Servidor corriendo en puerto ${this.port}`)
    })
  }
}

export { Server }
