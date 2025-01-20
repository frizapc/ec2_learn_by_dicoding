const InvariantError = require('../../exceptions/InvariantError');
const { NotePayloadSchema, ProductPayloadSchema, ProductQuerySchema } = require('./schema');

const NotesValidator = {
  validateNotePayload: (payload) => {
    const validationResult = NotePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

const ProductsValidator = {
  validateProductPayload: (payload) => {
    const validationResult = ProductPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
  validateProductQuery: (query) => {
    const validationResult = ProductQuerySchema.validate(query);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
    return validationResult;
  },
};

module.exports = { NotesValidator, ProductsValidator };
