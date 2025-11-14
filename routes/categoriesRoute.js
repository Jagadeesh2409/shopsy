const express = require('express')
const router = express.Router()

const {createCategory,deleteCategoryById,getAllCategories,getCategoryById,updateCategory} = require('../controllers/categoriesController')
const {adminAuthenticate,authenticateToken } = require('../middleware/authMiddleware')
const {ErrorResponse,SucessResponse, response} = require('../utils/response')


router.get('/',getAllCategories)
router.post('/',createCategory)
router.put('/:id',updateCategory)
router.delete('/:id',deleteCategoryById)
router.get('/:id',getCategoryById)

module.exports = router