const Order = require('../models/orderModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const createOrder = asyncHandler(async (req, res) => {
	const { _id } = req.user

	const userCart = await User.findById(_id).select('cart')

	return res.json({
		success: userCart ? true : false,
		createdBlog: userCart ? userCart : "can't create new blog",
	})
})

module.exports = {
	createOrder,
}
