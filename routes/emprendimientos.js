const {Router} = require('express')
const router = Router()

// Middlewares

// Controlador
const EmprendimientoController = require('../controllers/emprendimientos')

// Rutas

// Registrar emprendimiento
router.post('/registrar', EmprendimientoController.postEmprendimiento)

module.exports = router