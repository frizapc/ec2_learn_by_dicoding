/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { server as _server } from '@hapi/hapi';

const init = async () => {
  const server = _server({
    port: 5000,
    host: 'localhost',
  });

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        return 'Hello World!';
      },
    },
    {
      method: 'GET',
      path: '/about',
      handler: (request, h) => {
        return h
          .response({ message: 'About Page' })
          .header('Content-Type', 'application/json')
          .code(404);
      },
    },
    {
      method: '*',
      path: '/{any*}',
      handler: function (request, h) {
        return h
          .response('404 Error! Page Not Found!')
          .header('Content-Type', 'text/html')
          .code(404);
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
