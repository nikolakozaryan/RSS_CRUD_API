import { CodeMessages } from '../types/code-messages.types';

export const MESSAGES: CodeMessages = {
  SUCCESS: {
    code: 200,
    message: '',
  },
  CREATED: {
    code: 201,
    message: '',
  },
  USER_DELETED: {
    code: 204,
    message: '',
  },
  INVALID_ID: {
    code: 400,
    message: 'Invalid uuid.',
  },
  INVALID_DATA: {
    code: 400,
    message: 'Invalid data.',
  },
  USER_NOT_FOUND: {
    code: 404,
    message: "User doesn't exist.",
  },
  INVALID_RESOURCE: {
    code: 404,
    message: 'No such a resource.',
  },
  SERVER_ERROR: {
    code: 500,
    message: 'Internal server error.',
  },
};

export const REQUIRED_KEYS = ['username', 'age', 'hobbies'];
export const BASIC_URL = 'http://localhost';
