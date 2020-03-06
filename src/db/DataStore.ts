import DataStore from 'nedb';
import { ServerRoute } from '@hapi/hapi';

import { Controller } from '../controllers/typings';

const db = new DataStore();

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

export { db, createCrudConfig };
