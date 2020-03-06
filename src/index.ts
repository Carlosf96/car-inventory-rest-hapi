import { Server } from '@hapi/hapi';
import CarRoute from './routers/Car.route';
const init = async (): Promise<void> => {
  const server: Server = new Server({
    port: 8000,
    host: 'localhost',
  });

  server.route(CarRoute);

  await server.start();

  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
