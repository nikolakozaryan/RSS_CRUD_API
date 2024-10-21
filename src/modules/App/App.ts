import { Server, createServer } from 'node:http';
import EventEmitter from 'events';
import { Router } from '../Router/Router';
import { sendResponse } from '../../utils/sendResponse';
import { CustomRequest } from '../../models/classes/custom-request.class';
import { HandlerType } from '../../models/types/endpoint-handler.types';
import { Methods } from '../../models/types/router.types';

export class App {
  emitter: EventEmitter;
  server: Server;
  middlewares: HandlerType[];
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middlewares = [];
  }

  use(middleware: HandlerType) {
    this.middlewares.push(middleware);
  }

  listen(port: number, callback: () => void) {
    this.server.listen(port, callback);
  }

  addRouter(router: Router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(this._getRouteMask(path, method as Methods), (req, res) => {
          const handler = endpoint[method as Methods]!;
          handler(req, res);
        });
      });
    });
  }

  _getRouteMask(path: string, method: Methods) {
    return `[${path}]:[${method}]`;
  }

  _createServer() {
    return createServer((req, res) => {
      const customReq = req as CustomRequest;

      try {
        let body = '';

        customReq.on('data', (chunk) => {
          body += chunk;
        });

        customReq.on('end', () => {
          if (body) {
            customReq.body = JSON.parse(body);
          }
          this.middlewares.forEach((middleware) => middleware(customReq, res));

          const eventName = this._getRouteMask(customReq.pathname, customReq.method as Methods);
          const emitted = this.emitter.emit(eventName, req, res);

          if (!emitted) sendResponse(res, 'INVALID_RESOURCE');
        });
      } catch {
        sendResponse(res, 'SERVER_ERROR');
      }
    });
  }
}
