const db =  require('../db/db');
const {ErrorResponse,SucessResponse,response} = require('../utils/response');

const getAllCategories = async (req, res) => {
    try {
        const categories = await db('categories').where({is_deleted:false});
        return SucessResponse(res, categories, response.GET_CATEGORIES_SUCCESS);
    } catch (error) {
        ErrorResponse(res, response.ISE, 500);
    }

};

const createCategory = async (req, res) => {
    try {
        const category = req.body;
        const [id] = await db('categories').insert(category);
        const newCategory = await db('categories').where({ id }).first();
        return SucessResponse(res, newCategory, response.CATEGORIES_CREATED_SUCCESS);
    } catch (error) {
        if ( error.code == 'ER_DUP_ENTRY') {
         return ErrorResponse(res, response.CATEGORIES_ALREADY_EXISTS, 400);
         }
        ErrorResponse(res, response.ISE, 500);
    }
};


const updateCategory = async (req, res) => {
    try {
        const {id} = req.params;
        const category = req.body;

        const exist = await db('categories').where({id}).first()
        if(!exist){
            return ErrorResponse(res,response.CATEGORIES_NOT_FOUND)
        }

        await db('categories').where({ id }).update(category);
        const updatedCategory = await db('categories').where({ id }).first();
        return SucessResponse(res, updatedCategory, response.CATEGORIES_UPDATED_SUCCESS);
    } catch (error) {
        if ( error.code == 'ER_DUP_ENTRY') {
         return ErrorResponse(res, response.CATEGORIES_ALREADY_EXISTS, 400);
         }
        ErrorResponse(res, response.ISE, 500);
    }
};

const deleteCategoryById = async (req, res) => {
    try {
        const {id} = req.params;
        const exist = await db('categories').where({id,is_deleted:false}).first()
        if(!exist){
            return ErrorResponse(res,response.CATEGORIES_NOT_FOUND)
        }
        await db('categories').where({ id }).update({ is_deleted: true });
        return SucessResponse(res, null, response.CATEGORIES_DELETED_SUCCESS);
    }
    catch (error) {
        ErrorResponse(res, response.ISE, 500);
    }
};

const getCategoryById = async (req, res) => {
    try {
        const {id} = req.params;
        const category = await db('categories').where({ id }).andWhere({is_deleted: false}).first();
        if (!category) {
            return ErrorResponse(res,response.CATEGORIES_NOT_FOUND);
        }
        return SucessResponse(res, category, response.GET_CATEGORIES_SUCCESS);
    } catch (error) {
        ErrorResponse(res, response.ISE, 500);
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategoryById,
    getCategoryById,
};