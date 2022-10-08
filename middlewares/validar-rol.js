const {response} = require('express')

const esAdminRol = (req, res = response, next) =>{

  if(!req.usuario){
    return res.status(500).json({
      ok: false,
      message: 'Se quiere verificar el rol sin validar el token primero'
    })
  }

  const {rol, nombre} = req.usuario

  if(rol !== 'ADMIN_ROL'){
    return res.status(500).json({
      ok: false,
      message: `${nombre} no es administrador - No puede hacer esto`
    })
  }

  next()
}

module.exports = {
  esAdminRol
}