const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const register = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, password, mobile } = req.body

	if (!firstName || !lastName || !email || !password || !mobile)
		return res.status(400).json({
			success: false,
			mes: 'Missing inputs',
		})

	const respone = await User.create(req.body)

	return res.status(200).json({
		success: respone ? true : false,
		mes: respone ? respone : "can't create",
	})
})

module.exports = {
	register,
}
