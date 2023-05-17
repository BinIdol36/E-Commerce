const router = require('express').Router()
const { register } = require('../controllers/useController')

router.post('/register', register)

module.exports = router
