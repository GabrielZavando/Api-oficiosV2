const {Schema, model} = require('mongoose')

const OficioSchema = Schema({
  oficio: {
    type: String,
  }
})

module.exports = model('Oficio', OficioSchema)