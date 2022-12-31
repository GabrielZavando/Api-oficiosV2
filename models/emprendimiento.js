import mongoose from 'mongoose'
import { geocoder } from '../helpers/geocoder.js'

const EmprendimientoSchema = new mongoose.Schema({
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
    type: String,
    required: false
  },
  logo: {
    type: String,
    required: false
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
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
    required: true
  },
})

// Consumimos API Mapquest para añadir location y quitamos la direccion

EmprendimientoSchema.pre('save', async function(next){
  const loc = await geocoder(this.direccion)
  this.ubicacion = {
    type: 'Point',
    coordenadas: [loc[0].longitude, loc[0].latitude],
    formatodireccion: loc[0].formattedAddress
  }

  // Quitamos dirección de la base de datos
  this.direccion = undefined
  next()
})

const Emprendimiento = mongoose.model('Emprendimiento', EmprendimientoSchema)

export { Emprendimiento }
