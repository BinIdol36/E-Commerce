const router = require('express').Router()
const {
	createNewBlog,
	updateBlog,
	getBlogs,
	likeBlog,
	dislikeBlog,
	getBlog,
	deleteBlog,
	uploadImageBlog,
} = require('../controllers/blogController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.get('/', getBlogs)
router.post('/', [verifyAccessToken, isAdmin], createNewBlog)
router.get('/one/:bid', getBlog)
router.put(
	'/image/:bid',
	[verifyAccessToken, isAdmin],
	uploader.single('image'),
	uploadImageBlog,
)
router.put('/like/:bid', verifyAccessToken, likeBlog)
router.put('/dislike/:bid', verifyAccessToken, dislikeBlog)
router.put('/:bid', [verifyAccessToken, isAdmin], updateBlog)
router.delete('/:bid', [verifyAccessToken, isAdmin], deleteBlog)

module.exports = router
