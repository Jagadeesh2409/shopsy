const db = require('../db/db');
const {  ErrorResponse, response, SucessResponse} = require('../utils/response');
const _ = require('lodash');


const createProduct = async (req,res) => {
  try {
    const productData = req.body
    productData.slug = _.kebabCase(`${productData.name}-${productData.mrp}-${productData.brand}`)
    const exist = await db('products').where({slug:productData.slug}).first()
    if(exist){
      return ErrorResponse(res,response.PRODUCT_ALREADY_EXISTS)
    }
    const data = await db('products').insert(productData)
    SucessResponse(res,productData,response.PRODUCT_CREATED_SUCCESS)    
  } catch (error) {
    ErrorResponse(res,response.ISE)
  }
}

const getAllProducts = async (req,res) => {
  try {
    const data = await db('products').where({is_deleted:false})
    SucessResponse(res,data,response.GET_PRODUCTS_SUCCESS)
  } catch (error) {
    ErrorResponse(res,response.ISE)
  }
}


const updateProduct = async (req,res) => {
  const {id} = req.params
  const data = req.body
  try {

    const exist = await db('products').where({id,is_deleted:false}).first()
    if(!exist){
      ErrorResponse(res,response.PRODUCT_NOT_FOUND)
    }
    await db('products').update(data).where({id})
    SucessResponse(res,null,response.PRODUCT_UPDATED_SUCCESS)
    
  } catch (error) {
    if ( error.code == 'ER_DUP_ENTRY') {
      return ErrorResponse(res,response.PRODUCT_ALREADY_EXISTS);
    }
    console.log(error.message)
    ErrorResponse(res,response.ISE)
  }
}

const getProductById = async (req,res) => {
  const {id} =  req.params
  try {
    const data = await db('products').where({id,is_deleted:false}).first()
    if(!data){
      return ErrorResponse(res,response.PRODUCT_NOT_FOUND)
    }
    SucessResponse(res,data,response.GET_PRODUCTS_SUCCESS)
    
  } catch (error) {
    ErrorResponse(res,response.ISE)
    
  }
}

const deleteProduct = async (req,res) => {
  const {id} = req.params

  try {
    const product =  await db('products').where({id,is_deleted:false})
    if(!product){
      return ErrorResponse(res,response.PRODUCT_NOT_FOUND)
    }
    await db('products').update({is_deleted:true}).where({id})
    SucessResponse(res,null,response.PRODUCT_DELETED_SUCCESS)
  } catch (error) {
    ErrorResponse(res,response.ISE)
  }
}


module.exports = {createProduct,getAllProducts,updateProduct,getProductById,deleteProduct}