import { Request, ResponseToolkit } from "@hapi/hapi";

export interface Controller {
  create: (req: Request, res: ResponseToolkit) => any;
  get: (req: Request, res: ResponseToolkit) => any;
  update: (req: Request, res: ResponseToolkit) => any;
  destroy: (req: Request, res: ResponseToolkit) => any;
  patch: (req: Request, res: ResponseToolkit) => any;
}
