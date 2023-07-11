const express = require('express')
require('dotenv').config()
const dbConnect = require('./config/dbConnect')
const initRoutes = require('./routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(
	cors({
		origin: process.env.URL_CLIENT,
		methods: ['POST', 'PUT', 'GET', 'DELETE'],
	}),
)
app.use(cookieParser())
const port = process.env.PORT || 8888

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dbConnect()

initRoutes(app)

app.listen(port, () => {
	console.log('Server running http://localhost:' + port)
})
