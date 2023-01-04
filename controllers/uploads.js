import { request, response } from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const cargarArchivo = (req = request, res = response) => {

  if(!req.files
    || Object.keys(req.files).length === 0
    || !req.files.archivo){
      return res.status(400).json({
        ok: true,
        message: 'No hay archivos que subir'
      })
    }

  const {archivo} = req.files

  const uploadPath = path.join(__dirname, '../uploads/', archivo.name)

  archivo.mv(uploadPath, (err)=> {
    if (err){
      console.log()
      return res.status(500).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      message: `El archivo se subio a ${uploadPath}`
    })
  })
}

export {
  cargarArchivo
}
