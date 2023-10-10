const Order = require('../models/orderModel')
const User = require('../models/userModel')
const Coupon = require('../models/couponModel')
const asyncHandler = require('express-async-handler')

const createOrder = asyncHandler(async (req, res) => {
	const { _id } = req.user
	const { products, total, address, status } = req.body

	if (address) {
		await User.findByIdAndUpdate(_id, { address, cart: [] })
	}

	const data = { products, total, orderBy: _id }
	if (status) data.status = status

	const rs = await Order.create({ products, total, orderBy: _id, status })

	return res.json({
		success: rs ? true : false,
		rs: rs ? rs : 'Something went wrong',
	})
})

const updateStatus = asyncHandler(async (req, res) => {
	const { oid } = req.params
	const { status } = req.body

	if (!status) throw new Error('Missing status')

	const response = await Order.findByIdAndUpdate(oid, { status }, { new: true })

	return res.json({
		success: response ? true : false,
		response: response ? response : 'Something went wrong',
	})
})

const getUserOrder = asyncHandler(async (req, res) => {
	const { _id } = req.user

	const response = await Order.find({ orderBy: _id })

	return res.json({
		success: response ? true : false,
		response: response ? response : 'Something went wrong',
	})
})

const getOrders = asyncHandler(async (req, res) => {
	const response = await Order.find()

	return res.json({
		success: response ? true : false,
		response: response ? response : 'Something went wrong',
	})
})

module.exports = {
	createOrder,
	updateStatus,
	getUserOrder,
	getOrders,
}
