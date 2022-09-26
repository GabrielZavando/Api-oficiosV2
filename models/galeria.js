
const {Schema, model} = require('mongoose')

const GaleriaSchema = Schema({
  emprendimiento: {
    type: Schema.Types.ObjectId,
    ref: "Emprendimiento"
  },
  videos: {
    type: [{
      titulo: String,
      urlVideo: String
    }],
    validate: [limitVideo, '{PATH} excede el límite de 3 videos']
  },
  imagenes: {
    type: [{
      titulo: String,
      urlImg: String
    }],
    validate: [limitImagen, '{PATH} excede el límite de 10 imágenes']
  }
})

function limitVideo(val) {
  return val.length <= 3;
}

function limitImagen(val) {
  return val.length <= 10;
}

module.exports = model('Galeria', GaleriaSchema)