const {request, response} = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')

// TODO
// Establecer un formato de respuesta

// Registrar un usuario
const postUser = async (req = request, res = response) => {
  const {nick, nombre, correo, password, rrss} = req.body
  const usuario = new Usuario({nick, nombre, correo, password, rrss})
  // Encriptar la contraseña
  // salt = complejidad de la encriptación (10 por defecto)
  const salt = bcrypt.genSaltSync(12)
  usuario.password = bcrypt.hashSync(password, salt)

  try {
    // Guardar usuario en base de datos
    await usuario.save()
    // Emitir respuesta
    res.status(200).json({
      ok: true,
      message: 'Usuario registrado correctamente',
      usuario
    })
  }catch(err){
    console.log(err)
    res.status(500).json({
      ok: false,
      message: err
    })
  }
}

// Login usuario

// Obtener un usuario por id
const getUser = async (req = request, res = response) => {
  const {id} = req.params
  const usuario = await Usuario.findById(id)
                               .populate('emprendimiento')
  try {
    res.status(200).json({
      ok: true,
      usuario
    })
  }catch(err){
    console.log(err)
  }
}

// Editar un usuario por id
const putUser = async (req = request, res = response) => {
  const id = req.params.id
  // const {id} = req.params // alternativa ideal si recibimos multiples valores
  try {
    res.status(200).json({
      ok: true,
      message: 'Editar usuario por id'
    })
  }catch(err){
    console.log(err)
  }
}

// Eliminar un usuario por id
const deleteUser = async (req = request, res = response) => {
  try {
    res.status(200).json({
      ok: true,
      message: 'Hola Mundo'
    })
  }catch(err){
    console.log(err)
  }
}

// Obtener usuarios paginados
const getUsersPaged = async (req = request, res = response) => {
  const query = req.query
  const {q, nombre, apikey} = req.query
  try {
    res.status(200).json({
      ok: true,
      message: 'Usuarios paginados',
      q,
      nombre,
      apikey
    })
  }catch(err){
    console.log(err)
  }
}

// Obtener usuarios destacados y paginados
const getUsersFeaturedPaged = async (req = request, res = response) => {
  try {
    res.status(200).json({
      ok: true,
      message: 'Hola Mundo'
    })
  }catch(err){
    console.log(err)
  }
}

// Buscar /usuarios/buscar/:termino?desde=0&limite=6
const searchUsersPaged = async (req = request, res = response) => {
  try {
    res.status(200).json({
      ok: true,
      message: 'Hola Mundo'
    })
  }catch(err){
    console.log(err)
  }
}

module.exports = {
  postUser,
  getUser,
  putUser,
  deleteUser,
  getUsersPaged,
  getUsersFeaturedPaged,
  searchUsersPaged
}