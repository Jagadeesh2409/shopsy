const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be valid",
    "string.empty": "Email is required",
  }),
  phone_number: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 10 digits",
      "string.empty": "Phone number is required",
    }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});


const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
    'string.email': 'Enter a valid email address',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'any.required': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
  }),
}).unknown(false);


const unitSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'name is required',
    'any.required': "name is required",
  }),
  abbreviation:Joi.string().trim().max(10).required().messages({
      "string.empty": "abbreviaion not be empty",
      "any.required": "abbreviation is required",
    }),
})

const updateUnitSchema = Joi.object({
  name: Joi.string().trim().optional().messages({
    'string.empty': "name is required",
    'any.required': "name is required",
  }),
  abbreviation:Joi.string().trim().max(10).optional().messages({
      "string.empty": "abbreviaion not be empty",
      "any.required": "abbreviation is required",
    }),
})

const categoriesSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': "name is required",
    'any.required':"name is required"
  }),
  description: Joi.string().trim().max(255).optional().messages({
    'string.max' : "the description should not be exceed 255 character",
  })

})

const updateCategoriesSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': "name is required",
    'any.required':"name is required"
  }),
  description: Joi.string().trim().min(3).max(255).optional().messages({
    'string.min' : "the description should be atlease 3 character",
  })

})


const productSchema = Joi.object({
  name:Joi.string().required().trim().messages({
    "string.empty":"name not be empty",
    "any.required":"name is required"
  }),
  description:Joi.string().optional().trim().max(255).messages({
    "string.base":"description must be a text",
    "string.max": "description should not be exceed 255 characters"
  }),
  original_price: Joi.number().precision(2).required().positive().messages({
    "number.base":"original_price must be a number",
    "any.required":"original_price is required"
  }),
  mrp:Joi.number().precision(2).required().positive().messages({
    "number.base":"mrp must be a number",
    "any.required":"mrp is required"
  }),
  selling_price:Joi.number().precision(2).required().positive().messages({
    "number.base":"selling_price must be a number",
    "any.required":"selling_price is required"
  }),
  details:Joi.object().optional().messages({
    "object.base":"details must be valid object"
  }),
  brand:Joi.string().required().trim().messages({
    "string.base":"brand must be a string",
    "string.empty":"brand should not be empty",
    "any.required":"brand is required"
  }),
  stock:Joi.number().integer().required().positive().messages({
    "number.base":"stock must be a number",
    "any.required":"stock is required"
  }),
  category_id:Joi.number().integer().positive().required().messages({
    "number.base":"Category_id not selected",
    "any.required":"Category_id  is required"
  }),
  unit_id:Joi.number().integer().positive().required().messages({
    "number.base":"unit_id not selected",
    "any.required":"unit_id is required"
  }),
  tax:Joi.number().precision(2).positive().optional().messages({
    "number.base":"tax should be in percentage"
  }),
  discount_type:Joi.string().optional().messages({
    "string.base":"discount type must be valid "
  }),
  discount:Joi.number().precision(2).optional().messages({
    "dscount.base":"disocunt should be a number"
  })
})

const createDiscountSchema = Joi.object({
  discount_type: Joi.string()
    .valid("PERCENTAGE", "FLAT")
    .required()
    .messages({
      "any.only": "Discount type must be  PERCENTAGE or FLAT",
      "any.required": "Discount type is required",
    }),

  percentage: Joi.when("discount_type", {
    is: "PERCENTAGE",
    then: Joi.number().min(0).max(100).precision(2).required().messages({
      "number.base": "Percentage must be a number",
      "number.min": "Percentage cannot be less than 0",
      "number.max": "Percentage cannot exceed 100",
      "any.required": "Percentage is required for PERCENTAGE discount type",
    }),
    otherwise: Joi.number().precision(2).default(0),
  }),

  flat_amount: Joi.when("discount_type", {
    is: "FLAT",
    then: Joi.number().min(0).precision(2).required().messages({
      "number.base": "Flat amount must be a number",
      "any.required": "Flat amount is required for FLAT discount type",
    }),
    otherwise: Joi.number().precision(2).default(0),
  }),

  min_purchase_amount: Joi.number()
    .min(0)
    .precision(2)
    .optional()
    .messages({
      "number.base": "Minimum purchase amount must be a number",
    }),

  max_purchase_amount: Joi.number()
    .min(Joi.ref("min_purchase_amount"))
    .precision(2)
    .optional()
    .messages({
      "number.base": "Maximum purchase amount must be a number",
      "number.min": "Maximum purchase amount must be greater than or equal to minimum purchase amount",
    }),

  start_date: Joi.date().required().messages({
    "date.base": "Start date must be a valid date",
    "any.required": "Start date is required",
  }),

  end_date: Joi.date()
    .greater(Joi.ref("start_date"))
    .optional()
    .messages({
      "date.base": "End date must be a valid date",
      "date.greater": "End date must be after the start date",
    }),

  used_count: Joi.number().integer().min(0).default(0),
  is_deleted: Joi.boolean().default(false),
});

const updateProductSchema = productSchema
  .fork(Object.keys(productSchema.describe().keys), (schema) => schema.optional())
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided to update a product',
  });

  const updateDiscountSchema = createDiscountSchema.fork(
    Object.keys(createDiscountSchema.describe().keys),
    (schema) => schema.optional()
  );

  
module.exports = {registerSchema,loginSchema,unitSchema,updateUnitSchema,categoriesSchema,updateCategoriesSchema,productSchema,updateProductSchema,createDiscountSchema,updateDiscountSchema}
