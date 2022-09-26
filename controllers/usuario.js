const {request, response, json} = require('express')
const Usuario = require('../models/usuario')

// TODO
// Establecer un formato de respuesta

// Registrar un usuario

const registrarUsuario = async (req = request, res = response) => {
  try{
    const usuario = new Usuario(req.body)
  }catch(err){
    console.error(err)
    res.status(500).json({
      error: 'Error del servidor'
    })
  }
}

// Login usuario

// Obtener un usuario

// Editar un usuario específico

// Eliminar un usuario especifico

// Obtener usuarios paginados

// Obtener usuarios destacados

// Buscar /user/buscar/:termino?desde=0&limite=6