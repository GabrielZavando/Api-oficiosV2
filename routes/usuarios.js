const {Router} = require('express')
const router = Router()

// Middlewares

// Controlador de Usuarios

const UserController = require('../controllers/usuarios')

// Rutas

// Registrar usuario
router.post('/registrar', UserController.postUser )

//Login usuario

//Obtener usuario por id
router.get('/:id', UserController.getUser)

// Editar usuario por id
router.put('/:id', UserController.putUser)

// Eliminar usuario por id
router.delete('/:id', UserController.deleteUser)

// Obtener usuarios paginados
router.get('/', UserController.getUsersPaged)

// Obtener usuarios destacados y paginados
router.get('/:id', UserController.getUsersFeaturedPaged)

// Buscar usuarios por termino paginados
router.get('/:id', UserController.searchUsersPaged)


module.exports = router