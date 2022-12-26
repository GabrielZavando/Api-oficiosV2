import bcrypt from 'bcryptjs'
import { request, response } from 'express'
import { generarJWT } from '../helpers/generar-jwt.js'
import { googleVerify } from '../helpers/google-verify.js'
import { Categoria } from '../models/categoria.js'
import { Usuario } from '../models/usuario.js'

// TODO
// Establecer un formato de respuesta

// Registrar un usuario
const postUser = async (req = request, res = response) => {
  const {nickName, nombre, correo, password, categoria, rol = "USER_ROL"} = req.body
  
  const nick = nickName.split(" ").join("").toLowerCase()
  const categoriaDB = await Categoria.findOne({categoria})
  console.log(categoriaDB._id)
  const usuario = new Usuario({nick, nombre, correo, password, categoria: categoriaDB._id, rol})
  // Encriptar la contraseña
  // salt = complejidad de la encriptación (10 por defecto)
  const salt = bcrypt.genSaltSync(12)
  usuario.password = bcrypt.hashSync(password, salt)

  try {
    // Guardar usuario en base de datos
    await usuario.save()
    // Generar el JWT
    const token = await generarJWT(usuario._id)


    // Emitir respuesta
    res.status(200).json({
      ok: true,
      message: 'Usuario registrado correctamente',
      usuario,
      token
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
const loginUser = async (req = request, res = response) => {
  const {correo, password} = req.body
  try{
    // Verificar si el correo existe
    const usuarioDB = await Usuario.findOne({correo})
    if (!usuarioDB){
      return res.status(400).json({
        ok: false,
        message: 'Usuario / Contraseña no son correctos - correo'
      })
    }

    // Verificar que el usuario está activo
    if (!usuarioDB.estado){
      return res.status(400).json({
        ok: false,
        message: 'Usuario / Contraseña no son correctos - estado: false'
      })
    }

    // Verificar la contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password)
    if (!validPassword){
      return res.status(400).json({
        ok: false,
        message: 'Usuario / Contraseña no son correctos - password'
      })
    }

    // Generar el JWT
    const token = await generarJWT(usuarioDB._id)

    // Construir el objeto usuario completo
    const usuarioLogeado = await Usuario.findOne({correo})
                            .populate('categoria', 'nombre')


    return res.status(200).json({
      ok: true,
      usuario: usuarioLogeado,
      token
    })

  }catch(err){
    console.log(err)
    return res.status(500).json({
      ok: false,
      message: 'Error del servidor'
    })
  }
}

// Login usuario con google

const loginUserGoogle = async(req = request, res = response) => {
  const {id_token} = req.body

  try{
    const {nombre, avatar, correo} = await googleVerify(id_token)

    let usuario = await Usuario.findOne({correo})

    if(!usuario){
      // Tenemos que crearlo
      const data = {
        nombre,
        correo,
        password: '123456', // Le pongo algo sólo porque en el modelo es obligatorio
        avatar,
        googleSign: true
      }

      usuario = new Usuario(data)

      await usuario.save()
    }

    // Si el usuario en base de datos tiene estado: false
    if(!usuario.estado){
      return res.status(401).json({
        ok: false,
        message: 'Usuario bloqueado, hable con el administrador'
      })
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id)

    res.status(200).json({
      ok: true,
      usuario,
      token
    })
  }catch(err){
    console.log(err)

    res.status(400).json({
      ok: false,
      message: 'El token no se pudo verificar'
    })

  }


}

// Verificar y renovar token
const renewToken = async (req = request, res = response) => {
  const uid = req.uid

  try{
    const usuario = await Usuario.findById(uid)
     if(!usuario.estado){
      return res.status(404).json({
        ok: false,
        message: "El usuario no está registrado"
      })
     }

    // Generar el JWT
    const token = await generarJWT(uid)

    res.status(200).json({
      ok: true,
      uid,
      token
    })
  } catch(err){
    return res.status(500).json({
      ok: false,
      message: "Error del servidor"
    })
  }

}

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
  const {id} = req.params
  try {
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
    
    const usuarioAutenticado = req.usuario

    res.status(200).json({
      ok: true,
      message: 'Usuario borrado correctamente',
      usuario,
      usuarioAutenticado
    })
  }catch(err){
    console.log(err)
    response.status(500).json({
      ok: false,
      message: 'Error del servidor'
    })
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

export {
  postUser,
  loginUser,
  loginUserGoogle,
  renewToken,
  getUser,
  putUser,
  deleteUser,
  getUsersPaged,
  getUsersFeaturedPaged,
  searchUsersPaged
}
