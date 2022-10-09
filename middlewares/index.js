
const validaCampos = require('../middlewares/validar-campos')
const validaJWT = require('../middlewares/validar-jwt')
const validaRoles = require('../middlewares/validar-roles')
const validaEstado = require('../middlewares/validar-estado')

module.exports = {
  ...validaCampos,
  ...validaEstado,
  ...validaJWT,
  ...validaRoles
}