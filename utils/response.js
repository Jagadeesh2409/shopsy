const SucessResponse = (res, data, message = "Success") => {
  return res.status(200).json({ message, data });
};
const ErrorResponse = (res, error, statusCode = 500) => {
  return res.status(statusCode).json({ error });
};

const response = {

    ISE:"Internal Server Error",

    ALREADY_REGISTERED:"you already have an account",
    REGISTER_SUCCESS:"registered successfully",

    USER_NOT_FOUND:"user not found",
    INVALID_LOGIN:"invalid login",
    LOGIN_SUCCESS:"login successfully",

    MISSING_TOKEN:"missing token",
    UNAUTHORIZED:"unauthorized token",
    BLOCK:"you are blocked",
    
    PROFILE_GET_SUCCESS:"profile get successfully",
    PROFILE_GET_FAILED:"profile get failed",

    NO_UNITS_FOUND:"no units found",
    GET_UNITS_SUCCESS:"get unit successfully",
    UNITS_NOT_FOUND:"unit not found",
    GET_UNITS_SUCCESS:"get unit success",
    UNITS_CREATED_SUCCESS:"unit created successfully",
    UNITS_ALREADY_EXISTS:"units already exist",
    UNITS_UPDATED_SUCCESS:"unit updated successfully",
    UNITS_DELETED_SUCCESS:"units deleted successfully",

   GET_CATEGORIES_SUCCESS:"get categories successfully",
   CATEGORIES_CREATED_SUCCESS:"category created success",
   CATEGORIES_UPDATED_SUCCESS:"category updated successfully",
   CATEGORIES_GET_ERROR:"category get error ",
   CATEGORIES_DELETED_SUCCESS:"categories deleted successfully",
   CATEGORIES_ALREADY_EXISTS:"categories already exists",
   CATEGORIES_NOT_FOUND:"categories not found",

   NO_PRODUCTS_FOUND:"product not found",
   GET_PRODUCTS_SUCCESS:"get product successfully",
   PRODUCT_CREATED_SUCCESS:"product created successfully",
   PRODUCT_ALREADY_EXISTS:"product already exists",
   PRODUCT_NOT_FOUND:"product not found",
   PRODUCT_UPDATED_SUCCESS:"product updated successfully",
   PRODUCT_DELETED_SUCCESS:"prodcut deleted successfully",

   DISCOUNT_CREATED_SUCCESS:"discount created success",
   DISCOUNT_ALREADY_EXIST:"discount already exist",
   GET_DISCOUNT_SUCCESS:"get discounts successfully",
   DISCOUNT_NOT_FOUND:"discount not found",
   DISCOUNT_DELETED_SUCCESSFULLY:"discount deleted successfully",
   DISSCOUT_UPDATED:"discount updated successfully"

};

module.exports = { SucessResponse, ErrorResponse, response };
