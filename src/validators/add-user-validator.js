import Joi from "joi";
import User from "../models/userModel.js";

const addUserSchema = async (data) => {
  const user = await User.findOne({ id: data._id });
  return Joi.object({
    name: Joi.string().min(3).required().messages({
      "string.base": "name should be a string",
      "string.min": "name should include 3 characters or more",
      "any.required": "name is required",
    }),
    email: Joi.string().min(3).required().messages({
      "string.base": "email should be a string",
      "string.min": "email should include 3 characters or more",
      "any.required": "email is required",
    }),
    password: Joi.string().min(3).required().messages({
      "string.base": "password should be a string",
      "string.min": "password should include 3 characters or more",
      "any.required": "password is required",
    }),
  });
};

export default addUserSchema;
