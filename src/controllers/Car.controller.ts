import { Request, ResponseToolkit } from '@hapi/hapi';

import { Car } from '../db/entities/Car';

export default (db?: any) => {
  return {
    post: async (req: Request, res: ResponseToolkit) => {
      let { payload } = req;
      let { make, vin, model, year }: any = payload;
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
          let cars: Car[] = await db.find({});
          return cars.length ? cars : 'No cars found';
        } else {
          console.log(req.query)
          let cars: Car | Car[] = await db.find({ yr, ...req });
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
        return 'Query parameter _id is required in order to update a car';
      }
      if (_id !== undefined) {
        return 'You cannot change a Unique Identifier';
      }
      let update = await db.update(req);
      if (!update) {
        return 'Unable to update car with ID: ' + req.query._id;
      } else {
        return await db.find(req.query._id);
      }
    },
    delete: (req: Request, res: ResponseToolkit) => {
      // db.destroy();
      return 'delete request!';
    }
  };
};
