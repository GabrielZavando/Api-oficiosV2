const {response, request} = require('express')
const Usuario = require('../models/usuario')

const validarEstado = async(req = request, res = response, next) => {
  const {id} = req.params
  console.log(id)

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

module.exports = {
  validarEstado
}