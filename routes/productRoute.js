const express = require('express')
const router = express.Router()

const {createProduct,getAllProducts,updateProduct,getProductById,deleteProduct,} = require('../controllers/productController')
const validator = require('express-joi-validation').createValidator({passError:true})
const {adminAuthenticate,authenticateToken} = require('../middleware/authMiddleware')
const {productSchema,updateProductSchema} =  require('../utils/validation')

router.post('/',validator.body(productSchema),createProduct)
router.get('/',getAllProducts)
router.put('/:id',authenticateToken,adminAuthenticate,validator.body(updateProductSchema),updateProduct)
router.get('/:id',getProductById)
router.delete('/:id',authenticateToken,adminAuthenticate,deleteProduct)


module.exports =router

