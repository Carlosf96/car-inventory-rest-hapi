import { Request, ResponseToolkit } from "@hapi/hapi";

export interface Controller {
  post: (req: Request, res: ResponseToolkit) => any;
  get: (req: Request, res: ResponseToolkit) => any;
  put: (req: Request, res: ResponseToolkit) => any;
  delete: (req: Request, res: ResponseToolkit) => any;
}
