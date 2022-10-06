const {Router} = require('express')
const router = Router()

// Middlewares
const { check, query, checkBody } = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const {emailExiste, nickExiste, maxRrss} = require('../helpers/db-validators')

// Controlador
const UserController = require('../controllers/usuarios')
const { validarJWT } = require('../middlewares/validar-jwt')

// Rutas

// Registrar usuario
router.post('/registrar', [
  check('nick').custom(nickExiste),
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  check('nombre', 'El nombre no puede tener más de 30 caracteres').isLength({max: 30}),
  check('correo', 'El correo no es válido').isEmail(),
  check('correo').custom(emailExiste),
  check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
  check('rrss').custom(maxRrss), // revisar esta validación
  validarCampos
], UserController.postUser )

//Login usuario
router.post('/auth/login', [
  check('correo', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validarCampos
], UserController.loginUser)

//Obtener usuario por id
router.get('/:id', UserController.getUser)

// Editar usuario por id
router.put('/:id', UserController.putUser)

// Eliminar usuario por id
router.delete('/:id', [
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  validarCampos
], UserController.deleteUser)

// Obtener usuarios paginados
router.get('/', UserController.getUsersPaged)

// Obtener usuarios destacados y paginados
router.get('/:id', UserController.getUsersFeaturedPaged)

// Buscar usuarios por termino paginados
router.get('/:id', UserController.searchUsersPaged)


module.exports = router