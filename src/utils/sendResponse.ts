import { CustomRequest } from '../models/classes/custom-request.class';
import { MESSAGES } from '../models/constants/constants';
import { ServerResponse } from 'node:http';
import { IServerUser } from '../models/interfaces/storage.interface';

export const sendResponse = (
  res: ServerResponse,
  identificator: string,
  data?: IServerUser | IServerUser[]
) => {
  const messageData = MESSAGES[identificator];
  const { code } = messageData;

  res.writeHead(code, { 'Content-type': 'application/json' });
  res.end(JSON.stringify(code === 200 || code === 201 ? data : messageData));
};
