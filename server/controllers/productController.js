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
	const products = await Product.find()

	return res.status(200).json({
		success: products ? true : false,
		productDatas: products ? products : "Can't get product",
	})
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
