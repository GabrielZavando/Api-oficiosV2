
import { connect } from 'mongoose'

const dbConnection = async() =>{
  try{
    connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Base de datos online')
  }catch(error){
    console.log(error)
    throw new Error('Error al iniciar base de datos')
  }
}

export {
  dbConnection
}
