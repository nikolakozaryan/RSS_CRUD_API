import { IStorage, IServerUser } from '../../models/interfaces/storage.interface';

export class Storage implements IStorage {
  users: IServerUser[];
  constructor() {
    this.users = [];
  }

  add(user: IServerUser) {
    this.users.push(user);
  }

  get(user_id: string) {
    return this.users.find((user) => user.id === user_id);
  }

  update(user_id: string, user: IServerUser) {
    const curUser = this.get(user_id);

    if (!curUser) return false;

    this.users = this.users.filter((user) => user.id !== user_id);
    this.users.push({ ...user, id: user_id });
    return true;
  }

  delete(user_id: string) {
    const user = this.get(user_id);

    if (!user) return false;

    this.users = this.users.filter((user) => user.id !== user_id);
    return true;
  }
}
