import mongoose from 'mongoose'

const OficioSchema = new mongoose.Schema({
  oficio: {
    type: String,
  }
})

const Oficio = mongoose.model('Oficio', OficioSchema)

export { Oficio }
