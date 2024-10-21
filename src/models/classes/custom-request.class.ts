import { IncomingMessage } from 'node:http'
import { IServerUser } from '../interfaces/storage.interface';

export class CustomRequest extends IncomingMessage {
  pathname: string = '';
  userId: string = '';
  body: IServerUser | IServerUser[] = [];
}