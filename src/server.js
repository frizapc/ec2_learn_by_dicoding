require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');
const Handlebars = require('handlebars');
const path = require('path');
const products = require('./api/products');
const ProductsService = require('./services/inMemory/ProductsService');
const ClientError = require('./exceptions/ClientError');

const notes = require('./api/notes');
const NotesService = require('./services/postgres/NotesService');
const { NotesValidator, ProductsValidator } = require('./validator/notes');

const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

const init = async () => {
  const notesService = new NotesService();
  const usersService = new UsersService();
  const productsService = ProductsService;
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: notes,
      options: {
        service: notesService,
        validator: NotesValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
  ]);

  await server.register({
    plugin: products,
    options: {
      service: productsService,
      validator: ProductsValidator,
    },
  });

  await server.register(Vision);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }
    return h.continue;
  });

  server.views({
    engines: {
      hbs: Handlebars,
    },
    path: path.join('src/views'),
  });

  server.route({
    method: 'GET',
    path: '/haha',
    handler: (request, h) => h.view('index', {
      title: 'Hapi.js with Handlebars',
      message:
        'Ini adalah template rendering engine menggunakan handlebars dan plugin vision',
    }),
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
