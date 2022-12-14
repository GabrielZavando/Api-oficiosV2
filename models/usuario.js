import mongoose from 'mongoose'

const UsuarioSchema = new mongoose.Schema({
  nick: {
    type: String,
    unique: true,
    required: [false, 'El nombre de usuario es obligatorio'],
    maxlength: [12, 'El nombre de usuario no puede tener más de 12 caracteres']
  },
  avatar: {
    type: String,
    required: false
    // podría dejar una imagen por default
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    maxlength: [30, 'El nombre no puede tener más de 30 caracteres']
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
  },
  telefono: {
    type: String,
    maxlength: [15, 'El teléfono no puede tener más de 15 caracteres']
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: false,
  },
  rrss: {
    type: [{
      name: String,
      icon: String,
      url: String
    }],
    maxlength: 3,
    required: false
  },
  rol: {
    type: String,
    required: true,
    default: 'USER_ROL',
    enum: ['ADMIN_ROL', 'USER_ROL']
    // Puede quedar así pero puedo mejorarlo contrastando con BD
  },
  emprendimientos: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Emprendimiento'
    }],
    maxlength: 2,
    required: false
  },
  estado: {
    type: Boolean,
    default: true,
    required: true
  },
  destacado: {
    type: Boolean,
    default: false
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
    required: true
  }
})

// Quitamos la versión, el password y el _id del usuario para no mostrarlo

UsuarioSchema.methods.toJSON = function(){
  const {__v, password, _id, ...usuario} = this.toObject()
  usuario.uid = _id // Añadimos la propiedad uid al usuario y le asignamos el valor de _id
  return usuario // este usuario sólo se muestra en las respuestas del backend, en la base de datos se almacena el usuario exacto del modelo, incluído el _id.
}

const Usuario = mongoose.model('Usuario', UsuarioSchema)

export { Usuario }
