import { response, request } from 'express'
import { Usuario } from '../models/usuario.js'

// Validamos el estado de los usuarios cuya id recibimos por params
const validarEstado = async(req = request, res = response, next) => {
  const {id} = req.params

  try{
    const usuario = await Usuario.findById(id)

    if(!usuario.estado){
      return res.status(401).json({
        ok: false,
        message: 'El usuario está inactivo'
      })
    }

    next()
  }catch(err){
    console.log(err)
    res.status(401).json({
      ok: false,
      message: 'Id no válido'
    })
  }
}

export {
  validarEstado
}