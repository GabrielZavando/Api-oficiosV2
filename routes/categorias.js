import { Router } from 'express'
import { check } from 'express-validator'
const routeCategorias = Router()

// Middlewares

// Controlador
import {
  postCategoria
} from '../controllers/categorias.js'

import { validarCampos } from '../middlewares/validar-campos.js'
import { validarJWT } from '../middlewares/validar-jwt.js'
import { esAdminRol } from '../middlewares/validar-roles.js'

// Rutas

  // Registrar categoria

routeCategorias.post('/registrar', [
  validarJWT,
  esAdminRol,
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  validarCampos
], postCategoria)

  // Editar categoria

  // Eliminar categoria

  export {
    routeCategorias
  } 