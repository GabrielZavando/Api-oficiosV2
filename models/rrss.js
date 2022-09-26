const {Schema, model} = require('mongoose')

const RedSocialSchema = Schema({
  name: String,
  icon: String,
  url: String
})

module.exports = model('RedSocial', RedSocialSchema)