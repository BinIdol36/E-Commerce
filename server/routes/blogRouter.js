const router = require('express').Router()
const {
	createNewBlog,
	updateBlog,
	getBlogs,
	likeBlog,
	dislikeBlog,
	getBlog,
	deleteBlog,
} = require('../controllers/blogController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.get('/', getBlogs)
router.post('/', [verifyAccessToken, isAdmin], createNewBlog)
router.get('/one/:bid', getBlog)
router.put('/like/:bid', verifyAccessToken, likeBlog)
router.put('/dislike/:bid', verifyAccessToken, dislikeBlog)
router.put('/:bid', [verifyAccessToken, isAdmin], updateBlog)
router.delete('/:bid', [verifyAccessToken, isAdmin], deleteBlog)

module.exports = router
