import { CustomRequest } from '../models/classes/custom-request.class';
import { isMultiMode } from '../utils/isMultiMode';

export const parseUrl = (req: CustomRequest) => {
  const url = req.url as string;
  const parsedUrl = url.slice(1).split('/');
  const isMulti = isMultiMode();

  if (parsedUrl.length === (isMulti ? 2 : 3)) {
    req.pathname = '/' + parsedUrl.slice(0, isMulti ? 1 : 2).join('/');
    req.userId = parsedUrl[parsedUrl.length - 1];
  } else {
    req.pathname = url;
    req.userId = '';
  }
};
