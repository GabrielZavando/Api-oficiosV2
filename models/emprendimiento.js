const {Schema, model} = require('mongoose')
const geocoder = require('../helpers/geocoder')

const EmprendimientoSchema = Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  nombre: {
    type: String,
    required: [true, 'El nombre del emprendimiento es obligatorio'],
    maxlength: [40, 'El nombre de la empresa no puede tener más de 40 caracteres']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    maxlength: [150, 'La descripción no puede tener más de 150 caracteres']
  },
  banner: {
    type: String
  },
  logo: {
    type: String
  },
  tipo: {
    type: String,
    required: true,
    enum: ['Cultor','Maestro','Creativo']
  },
  oficio: {
    type: String,
    required: [true, 'El oficio es obligatorio']
  },
  web: {
    type: String,
    maxlength: [30, 'La web no puede tener más de 30 caracteres']
  },
  whatsapp: {
    type: String,
    maxlength: [15, 'El WhatsApp no puede tener más de 15 caracteres']
  },
  direccion: {
    type: String,
    required: [true, 'La dirección es obligatoria']
  },
  ubicacion: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordenadas: {
      type: [Number],
    },
    formatodireccion: String
  },
  rating: {
    type: Number,
    default: 0
  },
  rrss: {
    type: [{
      name: String,
      icon: String,
      url: String
    }],
    validate: [limitRrss, '{PATH} excede el límite de 3 redes sociales']
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
    required: true
  },
})

function limitRrss(val) {
  return val.length <= 3;
}

// Consumimos API Mapquest para añadir location y quitamos la direccion

EmprendimientoSchema.pre('save', async function(next){
  const loc = await geocoder.geocode(this.direccion)
  this.ubicacion = {
    type: 'Point',
    coordenadas: [loc[0].longitude, loc[0].latitude],
    formatodireccion: loc[0].formattedAddress
  }

  // Quitamos dirección de la base de datos
  this.direccion = undefined
  next()
})

module.exports = model('Emprendimiento', EmprendimientoSchema)