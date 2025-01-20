/* eslint-disable no-underscore-dangle */
class ProductsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.postProductHandler = this.postProductHandler.bind(this);
    this.getProductsHandler = this.getProductsHandler.bind(this);
  }

  async postProductHandler(request, h) {
    try {
      await this._validator.validateProductPayload(request.payload);
      const { name, price, category } = request.payload;

      this._service.push({ name, price, category });

      const response = h.response({
        status: 'success',
        message: 'Produk berhasil dimasukkan',
        data: {
          name,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(400);
      return response;
    }
  }

  async getProductsHandler(request, h) {
    const { name = '' } = request.query;
    await this._validator.validateProductQuery({ name });

    if (name !== '') {
      const product = this._service.filter((product) => product.name === name);
      const response = h.response({
        status: 'success',
        message: 'Produk berhasil ditampilkan',
        data: {
          product,
        },
      });
      return response;
    }

    const response = h.response({
      status: 'success',
      message: 'Produk berhasil ditampilkan',
      data: {
        products: this._service,
      },
    });
    return response;
  }
}

module.exports = ProductsHandler;
