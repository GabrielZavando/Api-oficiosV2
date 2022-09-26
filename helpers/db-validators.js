
const Oficio = require('../models/oficio')
const Usuario = require('../models/usuario')

const esOficioValido = async(oficio = '') => {
  const existeOficio = await Oficio.findOne({oficio})
  if (!existeOficio){
    throw new Error(`El oficio ${oficio} no existe`)
  }
}

const emailExiste = async(correo = '') => {
  const existeEmail = await Usuario.findOne({correo})
  if(existeEmail){
    throw new Error(`El correo ${correo} ya está registrado`)
  }
}

module.exports = {
  esOficioValido,
  emailExiste
}