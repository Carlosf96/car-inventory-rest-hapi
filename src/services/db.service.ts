import { Car } from "../db/entities/Car";
import { RequestQuery } from "@hapi/hapi";

interface IDbService {
  save: (data: any) => Promise<any>,
  update: (query: RequestQuery, payload: Car) => Promise<unknown>,
  destroy: (query: RequestQuery) => Promise<unknown>,
  find: (query: RequestQuery) => Promise<unknown>,
}

const createDbMethod = (method: string) => {

}

const DbService = (db: any): IDbService => {
  const promisify = (fn: any) => {
    return new Promise((resolve, reject) => {
      fn(resolve, reject)
    });
  }
  return {
    save: async (payload: Car): Promise<any> => {
      const creation = (payload: Car) => (resolve: any, reject: any) => db.insert(payload, (err: any, carsFound: Car[]) => {
        if (err) reject(err);
        resolve(carsFound);
      });
      return promisify(creation(payload));
    },
    update: async ({ query, payload }: RequestQuery & any): Promise<unknown> => {
      const update = (payload: Car) => (resolve: any, reject: any) => db.update(query, payload, (err: any, res: Car) => {
        if (err) reject(err);
        resolve(res)
      })
      return promisify(update(payload));
    },
    destroy: async ({ query }: RequestQuery): Promise<unknown> => {
      const deletion = (query: any) => (resolve: any, reject: any) => db.remove(query, (err: any, carsFound: Car[]) => {
        if (err) reject(err);
        resolve(carsFound);
      });
      return promisify(deletion(query));
    },
    find: async ({ query }: RequestQuery): Promise<unknown> => {
      const search = (query: any) => (resolve: any, reject: any) => db.find(query, (err: any, carsFound: Car[]) => {
        if (err) reject(err);
        resolve(carsFound);
      });
      return promisify(search(query));
    },
  };
}

export default DbService;
