import { Car, car } from "../db/entities/Car";

interface IDbService {
  save: (data: any) => Promise<any>,
  update: () => Promise<Car>,
  destroy: () => Promise<Car>,
  find: (query: any) => Promise<unknown>,
}

const promisify = (fn: any) => {
  return new Promise((resolve, reject) => {
    fn(resolve, reject)
  });
}

const DbService = (db: any): IDbService => {
  return {
    save: async (payload: Car): Promise<any> => {
      const creation = (payload: Car) => (resolve: any, reject: any) => db.insert(payload, (err: any, carsFound: Car[]) => {
        if (err) reject(err);
        resolve(carsFound);
      });
      return promisify(creation(payload));
    },
    update: async (): Promise<any> => {
      return;
    },
    destroy: async (): Promise<any> => {
      return;
    },
    find: async ({ query }: any): Promise<unknown> => {
      let year = 0;
      if (query?.year !== undefined) {
        year = Number(query.year);
        delete query.year;
      }
      const search = (year: number, query: any) => (resolve: any, reject: any) => db.find({ year, ...query }, (err: any, carsFound: Car[]) => {
        if (err) reject(err);
        resolve(carsFound);
      });
      return promisify(search(year, query));
    },
  };
}

export default DbService;
