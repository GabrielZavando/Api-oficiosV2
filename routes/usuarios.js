import { Router } from 'express'
const routeUsuarios = Router()

// Middlewares

import { check } from 'express-validator'
import { emailExiste, nickExiste } from '../helpers/db-validators.js'
import { validarCampos } from '../middlewares/validar-campos.js'
import { validarEstado } from '../middlewares/validar-estado.js'
import { validarJWT } from '../middlewares/validar-jwt.js'
import { esAdminRol } from '../middlewares/validar-roles.js'

// Controlador
import {
  deleteUser, getUser, getUsersFeaturedPaged, getUsersPaged, loginUser,
  loginUserGoogle, postUser, putUser, renewToken, searchUsersPaged
} from '../controllers/usuarios.js'

// Rutas

// Registrar usuario
routeUsuarios.post('/registrar', [
  validarJWT,
  esAdminRol,
  check('nick').custom(nickExiste),
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  check('nombre', 'El nombre no puede tener más de 30 caracteres').isLength({max: 30}),
  check('correo', 'El correo no es válido').isEmail(),
  check('correo').custom(emailExiste),
  check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
  // check('rrss').custom(maxRrss), // Esta validación va en la ruta editar
  validarCampos
], postUser )

//Login usuario
routeUsuarios.post('/auth/login', [
  check('correo', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validarCampos
], loginUser)

//Login usuario google
routeUsuarios.post('/auth/google', [
  check('id_token', 'Token de Google es necesario').not().isEmpty(),
  validarCampos
], loginUserGoogle)

// Verificar y renovar token
routeUsuarios.get('/auth/renew', [validarJWT, validarCampos], renewToken)

//Obtener usuario por id
routeUsuarios.get('/:id', getUser)

// Editar usuario por id
routeUsuarios.put('/:id', putUser)

// Eliminar usuario por id
routeUsuarios.delete('/:id', [
  validarJWT,
  esAdminRol,
  validarEstado,
  check('id', 'No es un ID válido').isMongoId(),
  validarCampos
], deleteUser)

// Obtener usuarios paginados
routeUsuarios.get('/', getUsersPaged)

// Obtener usuarios destacados y paginados
routeUsuarios.get('/:id', getUsersFeaturedPaged)

// Buscar usuarios por termino paginados
routeUsuarios.get('/:id', searchUsersPaged)


export {
  routeUsuarios
}