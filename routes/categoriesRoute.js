const express = require('express')
const router = express.Router()

const {createCategory,deleteCategoryById,getAllCategories,getCategoryById,updateCategory} = require('../controllers/categoriesController')
const {adminAuthenticate,authenticateToken } = require('../middleware/authMiddleware')
const {ErrorResponse,SucessResponse, response} = require('../utils/response')
const validator = require('express-joi-validation').createValidator({passError:true})
const {categoriesSchema,updateCategoriesSchema} = require('../utils/validation')


router.get('/',getAllCategories)
router.post('/',authenticateToken,adminAuthenticate,validator.body(categoriesSchema),createCategory)
router.put('/:id',authenticateToken,adminAuthenticate,validator.body(updateCategoriesSchema),updateCategory)
router.delete('/:id',authenticateToken,adminAuthenticate,deleteCategoryById)
router.get('/:id',getCategoryById)

module.exports = router