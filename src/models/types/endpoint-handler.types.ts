import {ServerResponse} from 'node:http'
import { CustomRequest } from '../classes/custom-request.class';

export type HandlerType = (req: CustomRequest, res: ServerResponse) => void;