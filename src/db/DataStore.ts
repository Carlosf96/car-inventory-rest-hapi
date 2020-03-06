import DataStore from 'nedb';
import { ServerRoute } from '@hapi/hapi';

import { Controller } from '../controllers/typings';
import DbService from '../services/db.service';

const dbInstance = new DataStore();

const db = DbService(dbInstance);

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
      handler: controller.put,
    },
    {
      method: 'POST',
      path: path || '/',
      handler: controller.post,
    },
    {
      method: 'DELETE',
      path: path || '/',
      handler: controller.delete,
    }
  ]
}

export { db, createCrudConfig };
