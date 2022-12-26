import mongoose from 'mongoose'

const CategoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
})

const Categoria = mongoose.model('Categoria', CategoriaSchema)

export { Categoria }
