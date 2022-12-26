import { Schema, model } from 'mongoose'

const RedSocialSchema = Schema({
  name: String,
  icon: String,
  url: String
})

export default model('RedSocial', RedSocialSchema)