const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const register = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, password, mobile } = req.body

	if (!firstName || !lastName || !email || !password || !mobile)
		return res.status(400).json({
			success: false,
			mes: 'Missing inputs',
		})

	const user = await User.findOne({ email })

	if (user) throw new Error('User has existed!')
	else {
		const newUser = await User.create(req.body)
		return res.status(200).json({
			success: newUser ? true : false,
			mes: newUser
				? 'register is successfully, please go login'
				: 'something went wrong',
		})
	}
})

const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	if (!email || !password)
		return res.status(400).json({
			success: false,
			mes: 'Missing inputs',
		})

	const response = await User.findOne({ email })

	if (response && response.isCorrectPassword(password)) {
		const { password, role, ...userData } = response.toObject()
		return res.status(200).json({
			success: true,
			data: userData,
		})
	} else {
		throw new Error('Invalid credentials!')
	}
})

module.exports = {
	register,
	login,
}
