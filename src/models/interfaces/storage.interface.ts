export interface IUser {
  username: string;
  age: number;
  hobbies: string[];
}

export interface IServerUser extends IUser {
  id: string;
}

export interface IStorage {
  users: IServerUser[];
  add: (user: IServerUser) => void;
  get: (user_id: string) => IServerUser | void;
  update: (user_id: string, user: IServerUser) => boolean;
  delete: (user_id: string) => boolean;
}
