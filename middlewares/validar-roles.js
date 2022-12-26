import { response } from 'express'

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

// Admitirá los roles que le pasemos como parámetro
// Ejemplo tieneRol('ADMIN_ROL', 'VENTAS_ROL', 'X_ROL')
const tieneRol = (...roles) => {
  return (req, res = response, next) => {

    if(!req.usuario){
      return res.status(500).json({
        ok: false,
        message: 'No se puede verificar el rol sin primero verificar el token'
      })
    }
     if(!roles.includes(req.usuario.rol)){
      return res.status(401).json({
        ok: false,
        message: `El servicio requiere uno de estos roles ${roles}`
      })
     }

    next()
  }
}

export {
  esAdminRol,
  tieneRol
}
