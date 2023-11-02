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

const getUserOrders = asyncHandler(async (req, res) => {
	const queries = { ...req.query }
	const { _id } = req.user

	// tách các trường đặt biệt ra khỏi query
	const excludeFields = ['limit', 'sort', 'page', 'fields']

	// xóa những trường excludeFields ra khỏi query
	excludeFields.forEach(el => delete queries[el])

	// format lại các operators cho đúng cú pháp mongoose
	let queryString = JSON.stringify(queries)
	// thay thế các từ đơn như "gte", "gt", "lt", "lte" => dạng "$gte", "$gt", "$lt", "$lte"
	queryString = queryString.replace(
		// biểu thức chính quy sử dụng để tìm các từ đơn ("gte", "gt", "lt", "lte") nằm độc lập giữa các ranh giới từ
		/\b(gte|gt|lt|lte)\b/g,
		macthedEl => `$${macthedEl}`,
	)
	const formatedQueries = JSON.parse(queryString)
	// let colorQueryObject = {}

	// // filtering
	// if (queries?.title)
	// 	formatedQueries.title = {
	// 		$regex: queries.title,
	// 		$options: 'i', // tìm kiếm không phân biệt chữ hoa chữ thường trong quá trình tìm kiếm theo mẫu
	// 	}
	// if (queries?.category)
	// 	formatedQueries.category = {
	// 		$regex: queries.category,
	// 		$options: 'i', // tìm kiếm không phân biệt chữ hoa chữ thường trong quá trình tìm kiếm theo mẫu
	// 	}
	// if (queries?.color) {
	// 	delete formatedQueries.color
	// 	const colorArr = queries.color?.split(',')
	// 	const colorQuery = colorArr.map(el => ({
	// 		color: { $regex: el, $options: 'i' },
	// 	}))
	// 	colorQueryObject = { $or: colorQuery }
	// }
	// let queryObject = {}
	// if (queries?.q) {
	// 	delete formatedQueries.q

	// 	queryObject = {
	// 		$or: [
	// 			{ color: { $regex: queries.q, $options: 'i' } },
	// 			{ title: { $regex: queries.q, $options: 'i' } },
	// 			{ category: { $regex: queries.q, $options: 'i' } },
	// 			{ brand: { $regex: queries.q, $options: 'i' } },
	// 			{ description: { $regex: queries.q, $options: 'i' } },
	// 		],
	// 	}
	// }

	const query = { ...formatedQueries, orderBy: _id }

	let queryCommand = Order.find(query)

	// sorting
	if (req.query.sort) {
		const sortBy = req.query.sort.split(',').join()
		queryCommand = queryCommand.sort(sortBy)
	}

	// fields limiting
	if (req.query.fields) {
		const fields = req.query.fields.split(',').join(' ')
		queryCommand = queryCommand.select(fields)
	}

	// pagination
	// limit: số object lấy về 1 lần gọi API
	// skip: 2
	// 1 2 3 ... 10
	// +2 => 2
	// +dasdads => NaN
	const page = +req.query.page || 1
	const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
	const skip = (page - 1) * limit
	queryCommand.skip(skip).limit(limit)

	// execute query
	// số lượng sp thỏa mãn điều kiện !== số lượng sản phẩm trả về 1 lần gọi API
	try {
		const response = await queryCommand.exec()
		const counts = await Order.find(query).countDocuments()

		return res.status(200).json({
			success: response ? true : false,
			counts,
			orders: response ? response : "Can't get orders",
		})
	} catch (err) {
		throw new Error(err.message)
	}
})

const getOrders = asyncHandler(async (req, res) => {
	const queries = { ...req.query }

	// tách các trường đặt biệt ra khỏi query
	const excludeFields = ['limit', 'sort', 'page', 'fields']

	// xóa những trường excludeFields ra khỏi query
	excludeFields.forEach(el => delete queries[el])

	// format lại các operators cho đúng cú pháp mongoose
	let queryString = JSON.stringify(queries)
	// thay thế các từ đơn như "gte", "gt", "lt", "lte" => dạng "$gte", "$gt", "$lt", "$lte"
	queryString = queryString.replace(
		// biểu thức chính quy sử dụng để tìm các từ đơn ("gte", "gt", "lt", "lte") nằm độc lập giữa các ranh giới từ
		/\b(gte|gt|lt|lte)\b/g,
		macthedEl => `$${macthedEl}`,
	)
	const formatedQueries = JSON.parse(queryString)
	// let colorQueryObject = {}

	// // filtering
	// if (queries?.title)
	// 	formatedQueries.title = {
	// 		$regex: queries.title,
	// 		$options: 'i', // tìm kiếm không phân biệt chữ hoa chữ thường trong quá trình tìm kiếm theo mẫu
	// 	}
	// if (queries?.category)
	// 	formatedQueries.category = {
	// 		$regex: queries.category,
	// 		$options: 'i', // tìm kiếm không phân biệt chữ hoa chữ thường trong quá trình tìm kiếm theo mẫu
	// 	}
	// if (queries?.color) {
	// 	delete formatedQueries.color
	// 	const colorArr = queries.color?.split(',')
	// 	const colorQuery = colorArr.map(el => ({
	// 		color: { $regex: el, $options: 'i' },
	// 	}))
	// 	colorQueryObject = { $or: colorQuery }
	// }
	// let queryObject = {}
	// if (queries?.q) {
	// 	delete formatedQueries.q

	// 	queryObject = {
	// 		$or: [
	// 			{ color: { $regex: queries.q, $options: 'i' } },
	// 			{ title: { $regex: queries.q, $options: 'i' } },
	// 			{ category: { $regex: queries.q, $options: 'i' } },
	// 			{ brand: { $regex: queries.q, $options: 'i' } },
	// 			{ description: { $regex: queries.q, $options: 'i' } },
	// 		],
	// 	}
	// }

	const query = { ...formatedQueries }

	let queryCommand = Order.find(query)

	// sorting
	if (req.query.sort) {
		const sortBy = req.query.sort.split(',').join()
		queryCommand = queryCommand.sort(sortBy)
	}

	// fields limiting
	if (req.query.fields) {
		const fields = req.query.fields.split(',').join(' ')
		queryCommand = queryCommand.select(fields)
	}

	// pagination
	// limit: số object lấy về 1 lần gọi API
	// skip: 2
	// 1 2 3 ... 10
	// +2 => 2
	// +dasdads => NaN
	const page = +req.query.page || 1
	const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
	const skip = (page - 1) * limit
	queryCommand.skip(skip).limit(limit)

	// execute query
	// số lượng sp thỏa mãn điều kiện !== số lượng sản phẩm trả về 1 lần gọi API
	try {
		const response = await queryCommand.exec()
		const counts = await Order.find(query).countDocuments()

		return res.status(200).json({
			success: response ? true : false,
			counts,
			orders: response ? response : "Can't get orders",
		})
	} catch (err) {
		throw new Error(err.message)
	}
})

module.exports = {
	createOrder,
	updateStatus,
	getUserOrders,
	getOrders,
}
