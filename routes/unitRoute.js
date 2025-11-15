const express = require('express')
const router = express.Router()
const {createUnit,deleteUnitById,getAllUnits,getUnitById,updateUnit} = require('../controllers/unitController')
const {adminAuthenticate,authenticateToken} = require('../middleware/authMiddleware')

const validator = require('express-joi-validation').createValidator({passError:true})
const {unitSchema,updateUnitSchema} = require('../utils/validation')

router.get('/',getAllUnits)
router.post('/',authenticateToken,adminAuthenticate,validator.body(unitSchema),createUnit)
router.put('/:id',authenticateToken,adminAuthenticate,validator.body(updateUnitSchema),updateUnit)
router.delete('/:id',authenticateToken,adminAuthenticate,deleteUnitById)
router.get('/:id',getUnitById)



module.exports = router