const mongoose = require('mongoose')

const url = `mongodb+srv://${process.env.USER_MONGO}:${process.env.USER_MONGO_PASS}@cluster0.${process.env.MONGO_ID_PASS}.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`


mongoose.connect(url)
  .then(() => {
    console.log('MONGODB conectado')
  })
  .catch((error) => {
    console.error(error)
  })

module.exports = mongoose
