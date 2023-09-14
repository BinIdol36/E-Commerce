const ProductCategory = require('../models/productCategoryModel')
const Prodcut = require('../models/productModel')
const asyncHandler = require('express-async-handler')
const data = require('../../data/ecommerce.json')
const categoryData = require('../../data/cate_brand')
const slugify = require('slugify')

const fn = async product => {
	await Prodcut.create({
		title: product?.name,
		slug: slugify(product?.name) + Math.round(Math.random() * 1000) + '',
		description: product?.description,
		brand: product?.brand,
		price: Math.round(Number(product?.price?.match(/\d/g).join('')) / 100),
		category: product?.category[1],
		quantity: Math.round(Math.random() * 1000),
		sold: Math.round(Math.random() * 1000),
		images: product?.images,
		color:
			product?.variants?.find(el => el.label === 'Color')?.variants[0] ||
			'BLACK',
		thumb: product?.thumb,
		// totalRating: Math.round(Math.random() * 5),
		totalRating: 0,
	})
}

const insertProduct = asyncHandler(async (req, res) => {
	const promises = []
	for (let product of data) promises.push(fn(product))

	await Promise.all(promises)

	return res.json('Done')
})

const fn2 = async category => {
	await ProductCategory.create({
		title: category?.cate,
		brand: category?.brand,
		image: category?.image,
	})
}

const insertCategory = asyncHandler(async (req, res) => {
	const promises = []
	for (let cate of categoryData) promises.push(fn2(cate))

	await Promise.all(promises)

	return res.json('Done')
})

module.exports = {
	insertProduct,
	insertCategory,
}
