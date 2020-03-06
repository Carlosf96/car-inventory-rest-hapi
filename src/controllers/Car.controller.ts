import { Request, ResponseToolkit } from '@hapi/hapi';

import { Car } from '../db/entities/Car';

export default (db?: any) => {
  return {
    post: async (req: Request, res: ResponseToolkit) => {
      const { payload } = req;
      const { make, vin, model, year }: any = payload;
      if (!make || !vin || !model || !year) {
        return res
          .response({
            message: 'All fields are required when registering a car'
          })
          .code(403);
      }
      const car = await db.save(payload);
      return car;
    },
    get: async (req: Request, res: ResponseToolkit) => {
      const { year, model, make, vin } = req.query;
      let yr;

      if (year !== undefined) {
        yr = Number(year);
        delete req.query.year;
      }
      try {
        if (!year || !model || !make || !vin) {
          console.log('no query params');
          const cars: Car[] = await db.find({});
          return cars.length ? cars : { message: 'No cars found' };
        } else {
          console.log(req.query)
          const cars: Car | Car[] = await db.find({ yr, ...req });
          return cars;
        }
      } catch (e) {
        console.log(e);
        return e;
      }
    },
    put: async (req: Request, res: ResponseToolkit) => {
      const { _id }: any = req.payload;
      if (!req.query._id) {
        console.log(req.query._id);
        return { message: 'Query parameter _id is required in order to update a car' };
      }
      if (_id !== undefined) {
        return { message: 'You cannot change a Unique Identifier' };
      }
      const update = await db.update(req);
      if (!update) {
        return { message: 'Unable to update car with ID: ' + req.query._id };
      } else {
        return await db.find(req.query._id);
      }
    },
    delete: async (req: Request, res: ResponseToolkit) => {
      const { _id } = req.query;
      if (!_id) {
        console.log(_id);
        return { message: 'Query parameter _id is required in order to remove a car' };
      }
      const deletion = await db.destroy(req);
      if (!deletion) {
        return { message: 'Could not delete car with _id: ' + _id }
      }
      return { message: 'Succesfull deletion for car with _id: ' + _id };
    }
  };
};
