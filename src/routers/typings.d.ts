import { Request, ResponseToolkit } from "@hapi/hapi"

export type Router = {
  method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH',
  path: string;
  handler: (req: Request, res: ResponseToolkit) => any;
}
