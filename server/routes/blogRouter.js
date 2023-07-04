const router = require('express').Router()
const {
	createNewBlog,
	updateBlog,
	getBlogs,
	likeBlog,
} = require('../controllers/blogController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.get('/', getBlogs)
router.post('/', [verifyAccessToken, isAdmin], createNewBlog)
router.put('/:bid', [verifyAccessToken, isAdmin], updateBlog)
router.get('/like', verifyAccessToken, likeBlog)

module.exports = router
