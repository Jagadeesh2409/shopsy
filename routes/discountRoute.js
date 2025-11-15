const express = require('express')
const router = express.Router()

const {createDiscount,getAllDiscounts,getDiscountById,deleteDiscount,updateDiscount} = require('../controllers/discountController')
const {createDiscountSchema,updateDiscountSchema} = require('../utils/validation')
const validator = require('express-joi-validation').createValidator({passError:true})
const {adminAuthenticate,authenticateToken} = require('../middleware/authMiddleware')

router.post('/',authenticateToken,adminAuthenticate,validator.body(createDiscountSchema),createDiscount)
router.get('/',getAllDiscounts)
router.get('/:id',getDiscountById)
router.delete('/:id',authenticateToken,adminAuthenticate,deleteDiscount)
router.put('/:id',authenticateToken,adminAuthenticate,validator.body(updateDiscountSchema),updateDiscount)


module.exports = router