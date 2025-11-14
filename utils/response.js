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
    
    PROFILE_GET_SUCCESS:"profile get successfully",
    PROFILE_GET_FAILED:"profile get failed",



};

module.exports = { SucessResponse, ErrorResponse, response };
