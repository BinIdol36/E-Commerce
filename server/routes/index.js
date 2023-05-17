const userRouter = require('./userRouter')

const initRoutes = app => {
	app.use('/api/user', userRouter)
}

module.exports = initRoutes
