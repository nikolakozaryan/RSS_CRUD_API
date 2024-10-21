import { Methods } from '../models/types/router.types';

export const getRequestOptions = (method: Methods, dataToSend: string) => ({
  method: method,
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(dataToSend),
  },
});
