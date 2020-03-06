import { ServerRoute } from '@hapi/hapi';

import db from '../db/DataStore';
import { Controller } from '../controllers/typings';
import CarController from '../controllers/Car.controller';

const carController = CarController(db);

const createCrudConfig = (controller: Controller, path?: string): ServerRoute[] => {
  return [
    {
      method: 'GET',
      path: path || '/',
      handler: controller.get,
    },
    {
      method: 'PUT',
      path: path || '/',
      handler: controller.update,
    },
    {
      method: 'POST',
      path: path || '/',
      handler: controller.create,
    },
    {
      method: 'DELETE',
      path: path || '/',
      handler: controller.destroy,
    },
    {
      method: 'PATCH',
      path: path || '/',
      handler: controller.patch,
    }]
}

export default createCrudConfig(carController, '/cars/');
