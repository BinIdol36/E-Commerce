const BlogCategory = require('../models/blogCategoryModel')
const asyncHandler = require('express-async-handler')

const createCategory = asyncHandler(async (req, res) => {
	const response = await BlogCategory.create(req.body)

	return res.json({
		success: response ? true : false,
		createdCatrgory: response ? response : "can't create new blog-category",
	})
})

const getCategories = asyncHandler(async (req, res) => {
	const response = await BlogCategory.find().select('title _id')

	return res.json({
		success: response ? true : false,
		blogCategories: response ? response : "can't get blog-category",
	})
})

const updateCategory = asyncHandler(async (req, res) => {
	const { bcid } = req.params
	const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {
		new: true,
	})

	return res.json({
		success: response ? true : false,
		updatedCategory: response ? response : "can't update blog-category",
	})
})

const deleteCategory = asyncHandler(async (req, res) => {
	const { bcid } = req.params
	const response = await BlogCategory.findByIdAndDelete(bcid)

	return res.json({
		success: response ? true : false,
		deleteCategory: response ? response : "can't delete blog-category",
	})
})

module.exports = {
	createCategory,
	getCategories,
	updateCategory,
	deleteCategory,
}
