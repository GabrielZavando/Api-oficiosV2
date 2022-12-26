import { request, response } from 'express'
import { Categoria } from '../models/categoria.js'

// Registrar una categoria
const postCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.split(" ").join("").toLowerCase()

  try{
    const categoriaDB = await Categoria.findOne({nombre})
    if(categoriaDB){
      return res.status(400).json({
        ok: false,
        message: `La categoría ${categoriaDB.nombre} ya existe`
      })
    }
    // Generamos data a guardar
    const data = {
      nombre,
      usuario: req.uid
    }
    const categoria = new Categoria(data)

    // Guardar categoria en la base de datos
    await categoria.save()

    return res.status(200).json({
      ok: true,
      message: 'Categoría registrada correctamente',
      categoria
    })
  }catch(err){
    res.status(500).json({
      ok: false,
      message: err
    })
  }
}

export {
  postCategoria
}
