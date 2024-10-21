import { v4 as uuidv4, validate } from 'uuid';
import { sendResponse } from '../utils/sendResponse';
import { isDataValid } from '../utils/isDataValid';
import { storage } from '../user-storage';
import { HandlerType } from '../models/types/endpoint-handler.types';
import { IServerUser, IUser } from '../models/interfaces/storage.interface';

export const getUsers: HandlerType = (req, res) => {
  const { userId } = req;

  if (!userId) {
    sendResponse(res, 'SUCCESS', storage.users);
    return;
  }

  if (!validate(userId)) {
    sendResponse(res, 'INVALID_ID');
    return;
  }

  const user = storage.get(userId);
  user ? sendResponse(res, 'SUCCESS', user) : sendResponse(res, 'USER_NOT_FOUND');
};

export const createUser: HandlerType = (req, res) => {
  const { userId } = req;

  if (userId) {
    sendResponse(res, 'INVALID_RESOURCE');
    return;
  }

  if (!isDataValid(req.body as IUser)) {
    sendResponse(res, 'INVALID_DATA');
    return;
  }

  const user = { ...req.body, id: uuidv4() } as IServerUser;
  storage.add(user);
  sendResponse(res, 'CREATED', user);
};

export const updateUser: HandlerType = (req, res) => {
  const { userId } = req;

  if (!validate(userId)) {
    sendResponse(res, 'INVALID_ID');
    return;
  }

  if (!isDataValid(req.body as IUser)) {
    sendResponse(res, 'INVALID_DATA');
    return;
  }

  const user = req.body as IServerUser;
  const updated = storage.update(userId, user);
  updated
    ? sendResponse(res, 'SUCCESS', { ...user, id: userId })
    : sendResponse(res, 'USER_NOT_FOUND');
};

export const deleteUser: HandlerType = (req, res) => {
  const { userId } = req;

  if (!validate(userId)) {
    sendResponse(res, 'INVALID_ID');
    return;
  }

  const isDeleted = storage.delete(userId);
  const message_code = `USER_${isDeleted ? 'DELETED' : 'NOT_FOUND'}`;

  sendResponse(res, message_code);
};
