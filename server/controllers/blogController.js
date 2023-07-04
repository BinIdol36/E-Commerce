const Blog = require('../models/blogModel')
const asyncHandler = require('express-async-handler')

const createNewBlog = asyncHandler(async (req, res) => {
	const { title, description, category } = req.body

	if (!title || !description || !category) throw new Error('Missing inputs')

	const response = await Blog.create(req.body)

	return res.json({
		success: response ? true : false,
		createdBlog: response ? response : "can't create new blog",
	})
})

const updateBlog = asyncHandler(async (req, res) => {
	const { bid } = req.params

	if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')

	const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true })

	return res.json({
		success: response ? true : false,
		updatedBlog: response ? response : "can't update blog",
	})
})

const getBlogs = asyncHandler(async (req, res) => {
	const response = await Blog.find()

	return res.json({
		success: response ? true : false,
		blogs: response ? response : "can't get blogs",
	})
})

// LIKE
// DISLIKE
/**
 * Khi người dùng like một bài blog thì:
 * 1. Check xem người đó trước đó có dislike hay không => Nếu bấm like có dislike. Bỏ dislike
 * 2. Check xem người đó trước đó có like hat không => Nếu bấm like có like. Bỏ like (hoặc ngược lại)
 */
// pull: kéo ra
// push: thêm vào
const likeBlog = asyncHandler(async (req, res) => {
	const { _id } = req.user
	const { bid } = req.body

	if (!bid) throw new Error('Missing inputs')

	const blog = await Blog.findById(bid)

	// 1. Check trạng thái có like hay dislike hay không
	const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id)

	if (alreadyDisliked) {
		const response = await Blog.findByIdAndUpdate(
			bid,
			{
				$pull: { dislikes: _id },
			},
			{ new: true },
		)

		return res.json({
			success: response ? true : false,
			rs: response,
		})
	}

	// 2. Ckeck
	const isLiked = blog?.likes?.find(el => el.toString() === _id)

	if (isLiked) {
		const response = await Blog.findByIdAndUpdate(
			bid,
			{
				$pull: { likes: _id },
			},
			{ new: true },
		)

		return res.json({
			success: response ? true : false,
			rs: response,
		})
	} else {
		const response = await Blog.findByIdAndUpdate(
			bid,
			{
				$push: { likes: _id },
			},
			{ new: true },
		)

		return res.json({
			success: response ? true : false,
			rs: response,
		})
	}
})

module.exports = {
	createNewBlog,
	updateBlog,
	getBlogs,
	likeBlog,
}
