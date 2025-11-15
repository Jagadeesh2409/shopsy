const db = require('../db/db')
const _ = require('lodash')
const {  ErrorResponse, response, SucessResponse} = require('../utils/response');

const createDiscount = async (req, res) => {
  try {
    const discount = req.body;
    discount.slug = _.kebabCase(`${discount.discount_type}-${discount.min_purchase_amount}-${discount.percentage || discount.flat_amount}-${discount.start_date}`)
    const exist = await db('discounts').where({slug:discount.slug}).first() 
    if(exist){
        return ErrorResponse(res,response.DISCOUNT_ALREADY_EXIST)
    }
    const [id] = await db('discounts').insert(discount);
    const newDiscount = await db('discounts').where({ id }).first();
    return SucessResponse(res, newDiscount, response.DISCOUNT_CREATED_SUCCESS);
  } catch (error) {
    ErrorResponse(res, error.message);
  }
};

const getAllDiscounts = async (req,res) => {
    try {
      const data = await db('discounts').where({is_deleted:false})
      SucessResponse(res,data,response.GET_DISCOUNT_SUCCESS)
    } catch (error) {
      ErrorResponse(res,response.ISE)
    }
}

const getDiscountById = async (req,res) => {
  const {id} = req.params
  try {
    const data = await db('discounts').where({id,is_deleted:false}).first()
    if(!data){
      return ErrorResponse(res,response.DISCOUNT_NOT_FOUND)
    }
    SucessResponse(res,data,response.GET_DISCOUNT_SUCCESS)
  } catch (error) {
     ErrorResponse(res,response.ISE)
  }
}

const updateDiscount = async (req,res) => {
  const {id} = req.params
  const data = req.body
  try {
    const datas = await db('discounts').update(data).where({id,is_deleted:false})
    if(!datas){
      return ErrorResponse(res,response.DISCOUNT_NOT_FOUND)
    }
    SucessResponse(res,null,response.DISSCOUT_UPDATED)
  } catch (error) {
      ErrorResponse(res,error.message)
  }
}

const deleteDiscount = async (req,res) => {
  const {id} = req.params
  try {
    const deleted = await db('discounts').update({is_deleted:true}).where({id})
    if(!deleted){
      ErrorResponse(res,response.DISCOUNT_NOT_FOUND)
    }
    SucessResponse(res,null,response.DISCOUNT_DELETED_SUCCESSFULLY)
    
  } catch (error) {
    ErrorResponse(res,response.ISE)
  }
}

module.exports = {createDiscount,getAllDiscounts,getDiscountById,deleteDiscount,updateDiscount}