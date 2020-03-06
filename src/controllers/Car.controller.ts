import { Request, ResponseToolkit, RequestQuery, } from '@hapi/hapi';

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
      const { make, vin, model, year } = req.query;
      let find = (query?: RequestQuery) =>
        new Promise((resolve, reject) => {
          let year;
          if (query?.year !== undefined) {
            year = Number(query.year);
            delete query.year;
          }
          db.find({ year, ...query }, (err: any, carsFound: Car[]) => {
            if (err) reject(err);
            resolve(carsFound);
          });
        });
      if (!make && !vin && !model && !year) {
        try {
          let cars: unknown = await find();
          console.log('no query params');
          return cars;
        } catch (e) {
          console.log(e);
          return e;
        }
      } else {
        try {
          let cars: unknown = await find(req.query);
          return cars;
        } catch (e) {
          console.log(e);
          return e;
        }
      }
    },
    put: (req: Request, res: ResponseToolkit) => {
      db.update()
      return 'put request!';
    },
    delete: (req: Request, res: ResponseToolkit) => {
      db.destroy()
      return 'delete request!';
    },
  };
};
