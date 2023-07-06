const router = require('express').Router()
const {
	createOrder,
	updateStatus,
	getUserOrder,
	getOrders,
} = require('../controllers/orderController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', verifyAccessToken, createOrder)
router.put('/status/:oid', [verifyAccessToken, isAdmin], updateStatus)
router.get('/', verifyAccessToken, getUserOrder)
router.get('/admin', [verifyAccessToken, isAdmin], getOrders)

module.exports = router
