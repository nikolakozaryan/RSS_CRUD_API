import { HandlerType } from '../../models/types/endpoint-handler.types';
import { Endpoints, Methods } from '../../models/types/router.types';

export class Router {
  endpoints: Endpoints;

  constructor() {
    this.endpoints = {};
  }

  request(method: Methods = 'GET', path: string, handler: HandlerType) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }

    const endpoint = this.endpoints[path];

    if (endpoint[method]) {
      throw new Error(`[${method}] по адресу ${path} уже существует`);
    }

    endpoint[method] = handler;
  }

  get(path: string, handler: HandlerType) {
    this.request('GET', path, handler);
  }
  post(path: string, handler: HandlerType) {
    this.request('POST', path, handler);
  }
  put(path: string, handler: HandlerType) {
    this.request('PUT', path, handler);
  }
  delete(path: string, handler: HandlerType) {
    this.request('DELETE', path, handler);
  }
}
