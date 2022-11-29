const path = require('path')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoSanisize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const cors = require('cors')

const petRouter = require('./routes/petRoutes')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(cors())

app.use(helmet())

app.use(morgan('common'))

app.use(mongoSanisize())

app.use(xss())

app.use('/api/v1/pets', petRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`找不到路径：${req.originalUrl}`, 404))
})

app.use(globalErrorHandler)

module.exports = app
