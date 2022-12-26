
import { request, response } from 'express'
import { verify } from 'jsonwebtoken'
import { Usuario } from '../models/usuario.js'
const secreto = process.env.SECRETORPRIVATEKEY

const validarJWT = async (req = request, res = response, next) =>{
  const token = req.header('x-token')
  if(!token){
    return res.status(401).json({
      ok: false,
      message: 'Falta el token en la petición'
    })
  }

  try{
    // Verificamo si el token enviado es correcto o no cumple siquiera con el formato
    const tokenValid = verify(token, secreto, function(err, decoded){
      if(err != null){
        return false
      }else{
        return true
      }
    })

    if(tokenValid === false){
      return res.status(401).json({
        ok: false,
        message: 'Token no válido - error formato'
      })
    }

    const {uid} = verify(token, secreto)

    // Obtenemos el usuario de la base de datos gracias al id
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

    // Guardamos el usuario autenticado y su uid en el objeto req
    req.usuario = usuario
    req.uid = uid

    next()
  }catch(err){
    console.log(err)
    res.status(401).json({
      ok: false,
      message: 'Token no válido'
    })
  }
}

export {
  validarJWT
}
