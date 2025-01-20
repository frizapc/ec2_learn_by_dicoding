const Joi = require('joi');

const NotePayloadSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
});

const ProductPayloadSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
});

const ProductQuerySchema = Joi.object({
  name: Joi.string().empty(''),
});

module.exports = {
  NotePayloadSchema,
  ProductPayloadSchema,
  ProductQuerySchema,
};
