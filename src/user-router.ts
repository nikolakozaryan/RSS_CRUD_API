import { Router } from './modules/Router/Router';
import { getUsers, createUser, deleteUser, updateUser } from './controller/user-controller';
import { isMultiMode } from './utils/isMultiMode';

export const userRouter = new Router();

const endpoint = `/api${isMultiMode() ? '' : '/users'}`;

userRouter.get(endpoint, getUsers);
userRouter.post(endpoint, createUser);
userRouter.put(endpoint, updateUser);
userRouter.delete(endpoint, deleteUser);
