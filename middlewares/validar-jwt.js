
const {response, request} = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validarJWT = async (req = request, res = response, next) =>{
  const token = req.header('x-token')
  if(!token){
    return res.status(401).json({
      ok: false,
      message: 'Falta el token en la petición'
    })
  }

  try{

    const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
    const usuario = await Usuario.findById(uid)

    // Verificamos que el usuario existe
    if(!usuario){
      return res.status(401).json({
        ok: false,
        message: 'Token no válido - usuario no existe'
      })
    }

    // Verificamos que el usuario esté activo
    if(!usuario.estado){
      return res.status(401).json({
        ok: false,
        message: 'Token no válido - usuario inactivo'
      })
    }

    // Guardamos el usuario autenticado en el objeto req
    req.usuario = usuario

    next()
  }catch(err){
    console.log(err)
    res.status(401).json({
      ok: false,
      message: 'Token no válido'
    })
  }
}

module.exports = {
  validarJWT
}