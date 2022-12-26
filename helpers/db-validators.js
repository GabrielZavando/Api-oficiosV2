
import {Categoria} from '../models/categoria.js'
import { Oficio } from '../models/oficio.js'
import { Usuario } from '../models/usuario.js'

const esOficioValido = async(oficio = '') => {
  const existeOficio = await Oficio.findOne({oficio})
  if (!existeOficio){
    throw new Error(`El oficio ${oficio} no existe`)
  }
}

const emailExiste = async(correo = '') => {
  const existeEmail = await Usuario.findOne({correo})
  if(existeEmail){
    throw new Error(`El correo ${correo} ya está registrado`)
  }
}

const nickExiste = async(nick = '') => {
  const nickExiste = await Usuario.findOne({nick})
  if(nickExiste){
    throw new Error(`El nombre de usuario ${nick} ya está registrado, por favor eliga uno distinto`)
  }
}

const maxRrss = async(rrss = []) => {
  if(rrss.length > 3){
    throw new Error('Sólo puedes registrar hasta 3 redes sociales')
  }
}

const categoriaExiste = async(categoria = '') => {
  const categoriaDB = await Categoria.findOne({nombre: categoria})
  if(!categoriaDB){
    throw new Error(`No existe la categoria ${categoria}`)
  }
}

export {
  esOficioValido,
  emailExiste,
  nickExiste,
  maxRrss,
  categoriaExiste
}