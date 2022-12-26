import { Router } from 'express'
const routeEmprendimientos = Router()

// Middlewares

// Controlador
import {
  postEmprendimiento
} from '../controllers/emprendimientos.js'

// Rutas

// Registrar emprendimiento
routeEmprendimientos.post('/registrar', postEmprendimiento)

export {
  routeEmprendimientos
}
