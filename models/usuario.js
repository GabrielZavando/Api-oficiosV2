const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({
  nick: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'],
    maxlength: [12, 'El nombre de usuario no puede tener más de 12 caracteres']
  },
  avatar: {
    type: String
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    maxlength: [30, 'El nombre no puede tener más de 30 caracteres']
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
    maxlength: [30, 'El correo no puede tener más de 30 caracteres']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    maxlength: [20, 'La contraseña no puede tener más de 20 caracteres']
  },
  telefono: {
    type: String,
    maxlength: [15, 'El teléfono no puede tener más de 15 caracteres']
  },
  rrss: {
    type: [{
      name: String,
      icon: String,
      url: String
    }],
    validate: [limitRrss, '{PATH} excede el límite de 3 redes sociales']
  },
  rol: {
    type: String,
    required: true,
    default: 'USER_ROL',
    enum: ['ADMIN_ROL', 'USER_ROL']
  },
  estado: {
    type: Boolean,
    default: true,
    required: true
  },
  googleSign: {
    type: Boolean,
    default: false
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

function limitRrss(val) {
  return val.length <= 3;
}

// Quitamos la versión, el password y el _id del usuario para no mostrarlo

UsuarioSchema.methods.toJSON = function(){
  const {__v, password, _id, ...usuario} = this.toObject()
  usuario.uid = _id // Añadimos la propiedad uid al usuario y le asignamos el valor de _id
  return usuario // este usuario sólo se muestra en las respuestas del backend, en la base de datos se almacena el usuario exacto del modelo, incluído el _id.
}

module.exports = model('Usuario', UsuarioSchema)