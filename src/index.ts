import { Server } from '@hapi/hapi';

import Routes from './routers/Routes';

const init = async (): Promise<void> => {
  const server: Server = new Server({
    port: 8000,
    host: 'localhost',
  });

  server.route(Routes.carRouter);

  await server.start();

  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
