const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

const createProduct = asyncHandler(async (req, res) => {
	if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')

	if (req.body && req.body.title) req.body.slug = slugify(req.body.title)

	const newProduct = await Product.create(req.body)

	return res.status(200).json({
		success: newProduct ? true : false,
		createProduct: newProduct ? newProduct : "Can't create new product",
	})
})

const getProduct = asyncHandler(async (req, res) => {
	const { pid } = req.params

	const product = await Product.findById(pid)

	return res.status(200).json({
		success: product ? true : false,
		productData: product ? product : "Can't get product",
	})
})

// Filtering, sorting & pagination
const getProducts = asyncHandler(async (req, res) => {
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

	// filtering
	if (queries?.title)
		formatedQueries.title = {
			$regex: queries.title,
			$options: 'i', // tìm kiếm không phân biệt chữ hoa chữ thường trong quá trình tìm kiếm theo mẫu
		}

	let queryCommand = Product.find(formatedQueries)

	// sorting
	if (req.query.sort) {
		const sortBy = req.query.sort.split(',').join()
		queryCommand = queryCommand.sort(sortBy)
	}

	// fields limiting

	// pagination

	// execute query
	// số lượng sp thỏa mãn điều kiện !== số lượng sản phẩm trả về 1 lần gọi API
	try {
		const response = await queryCommand.exec()
		const counts = await Product.find(formatedQueries).countDocuments()

		return res.status(200).json({
			success: response ? true : false,
			products: response ? response : "Can't get product",
			counts,
		})
	} catch (err) {
		throw new Error(err.message)
	}
})

const updateProduct = asyncHandler(async (req, res) => {
	const { pid } = req.params

	if (req.body && req.body.title) req.body.title = slugify(req.body.title)

	const updateProduct = await Product.findByIdAndUpdate(pid, req.body, {
		new: true,
	})

	return res.status(200).json({
		success: updateProduct ? true : false,
		updateProduct: updateProduct ? updateProduct : "Can't update product",
	})
})

const deleteProduct = asyncHandler(async (req, res) => {
	const { pid } = req.params

	const deletedProduct = await Product.findByIdAndDelete(pid)

	return res.status(200).json({
		success: deletedProduct ? true : false,
		deletedProduct: deletedProduct ? deletedProduct : "Can't delete product",
	})
})

module.exports = {
	createProduct,
	getProduct,
	getProducts,
	updateProduct,
	deleteProduct,
}
