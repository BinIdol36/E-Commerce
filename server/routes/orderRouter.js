const router = require('express').Router()
const {
	createOrder,
	updateStatus,
	getUserOrders,
	getOrders,
} = require('../controllers/orderController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', verifyAccessToken, createOrder)
router.put('/status/:oid', [verifyAccessToken, isAdmin], updateStatus)
router.get('/admin', [verifyAccessToken, isAdmin], getOrders)
router.get('/', verifyAccessToken, getUserOrders)

module.exports = router
