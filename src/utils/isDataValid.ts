import { REQUIRED_KEYS } from '../models/constants/constants';
import { IUser } from '../models/interfaces/storage.interface';

export const isDataValid = (data: IUser) => {
  const keys = Object.keys(data);
  const hasAllKeys = keys.length === 3 && keys.every((key) => REQUIRED_KEYS.includes(key));
  let hasValidKeys = true;

  if (hasAllKeys) {
    for (let key of REQUIRED_KEYS) {
      switch (key) {
        case 'username':
          hasValidKeys = typeof data[key] === 'string';
          break;
        case 'age':
          hasValidKeys = typeof data[key] === 'number';
          break;
        case 'hobbies':
          const hobbies = data[key];
          hasValidKeys = Array.isArray(hobbies) ? hobbies.every((item) => typeof item === 'string'): false;
          break;
        default:
          console.log('Something strange is happenig...');
      }
      if (!hasValidKeys) break;
    }
  }

  return hasAllKeys && hasValidKeys;
};
