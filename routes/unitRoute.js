const express = require('express')
const router = express.Router()
const {createUnit,deleteUnitById,getAllUnits,getUnitById,updateUnit} = require('../controllers/unitController')
const {adminAuthenticate,authenticateToken} = require('../middleware/authMiddleware')

router.get('/',getAllUnits)
router.post('/',authenticateToken,adminAuthenticate,createUnit)
router.put('/:id',authenticateToken,adminAuthenticate,updateUnit)
router.delete('/:id',authenticateToken,adminAuthenticate,deleteUnitById)
router.get('/:id',getUnitById)



module.exports = router