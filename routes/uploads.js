import { Router } from 'express'
const routeUploads = Router()

// Middlewares
import { check } from 'express-validator'
import { cargarArchivo } from '../controllers/uploads.js'
import { validarCampos } from '../middlewares/validar-campos.js'

routeUploads.post('/', cargarArchivo)

export {
  routeUploads
}