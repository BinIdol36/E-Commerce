const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const { notFound, errHandler } = require('../middlewares/errHandler')

const initRoutes = app => {
	app.use('/api/user', userRouter)
	app.use('/api/product', productRouter)

	app.use(notFound)
	app.use(errHandler)
}

module.exports = initRoutes
