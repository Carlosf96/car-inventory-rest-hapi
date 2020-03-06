import { Request, ResponseToolkit } from '@hapi/hapi';

export default (db?: any) => {
  return {
    create: (req: Request, res: ResponseToolkit) => {
      return 'post request!';
    },
    get: (req: Request, res: ResponseToolkit) => {
      return 'get request!';
    },
    update: (req: Request, res: ResponseToolkit) => {
      return 'put request!';
    },
    destroy: (req: Request, res: ResponseToolkit) => {
      return 'delete request!';
    },
  }
}
