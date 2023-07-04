const router = require('express').Router()
const { createOrder } = require('../controllers/orderController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', verifyAccessToken, createOrder)

module.exports = router
