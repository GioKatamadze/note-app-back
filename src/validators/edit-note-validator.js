import Joi from "joi";
import Note from "../models/noteModel.js";
import User from "../models/userModel.js";

const determineIfUserExist = (user) => (value, helpers) => {
  if (!user) {
    return helpers.messages("There is no user with this ID");
  }
  return value;
};

const determineIfNoteExist = (note) => (value, helpers) => {
  if (!note) {
    return helpers.messages("There is no note with this ID");
  }
  return value;
};

const addNoteSchema = async (data) => {
  const note = await Note.findOne({ id: data.id });
  const user = await User.findOne({ id: data.user_id });
  return Joi.object({
    title: Joi.string().min(3).required().messages({
      "string.base": "title should be a string",
      "string.min": "title should include 3 characters or more",
      "any.required": "title is required",
    }),
    content: Joi.string().min(3).required().messages({
      "string.base": "content should be a string",
      "string.min": "content should include 3 characters or more",
      "any.required": "content is required",
    }),
    user_id: Joi.string()
      .min(3)
      .required()
      .custom(determineIfUserExist(user))
      .messages({
        "string.base": "userId should be a string",
        "string.min": "userId should include 3 characters or more",
        "any.required": "userId is required",
      }),
    id: Joi.number().required().custom(determineIfNoteExist(note)).messages({
      "number.base": "id should be a number",
      "any.required": "id is required",
    }),
  });
};

export default addNoteSchema;
