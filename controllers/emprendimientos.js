const {request, response} = require('express')
const Emprendimiento = require('../models/emprendimiento')

// Registrar un emprendimiento
const postEmprendimiento = async(req = request, res = response) =>{
  const {nombre, descripcion, tipo, oficio, direccion} = req.body
  const emprendimiento = new Emprendimiento({nombre, descripcion, tipo, oficio, direccion})
  try{
    // Guardar emprendimiento en base de datos
    await emprendimiento.save()
    res.status(200).json({
      ok: true,
      message: 'Emprendimiento registrado correctamente',
      emprendimiento
    })
  }catch(err){
    console.log(err)
    res.status(500).json({
      ok: false,
      message: err
    })
  }
}

module.exports = {
  postEmprendimiento
}