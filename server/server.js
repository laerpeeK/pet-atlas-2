const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = require('./app')

process.on('unhandlerRejection', (err) => {
  console.log('UNHANDLER REJECTION! Shutting down...')
  console.log(err.name, err.message)
  processs.exit(1) //1-未捕获的致命异常：有一个未捕获的异常，它没有被域或未捕获的异常事件处理程序处理。
})

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
})

dotenv.config({
  path: './config.env',
})

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connect successfully!')
  })
  .catch((err) => {
    console.log('DB connect fail!')
    console.log(err.name, err.message)
    process.exit(1)
  })

const port = process.env.NODE_ENV === 'production'? 4060:3080
app.listen(port, () => {
  console.log(`App running on port: ${port}`)
})