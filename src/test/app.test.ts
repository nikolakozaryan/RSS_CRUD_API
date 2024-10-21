import request from 'supertest';
import { parseUrl } from '../middlewares/parseUrl';
import { App } from '../modules/App/App';
import { userRouter } from '../user-router';
import { Users } from './mock';

const app = new App();
app.use(parseUrl);
app.addRouter(userRouter);
const { server } = app;
const testApp = request(server);

afterAll(() => {
  server.close();
});

describe('Basic API functional with valid data', () => {
  let userId: string;
  it('should return empty array by default', async () => {
    const response = await testApp.get('/api/users');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should create user and return it in response', async () => {
    const response = await testApp.post('/api/users').send(Users.valid);

    expect(response.statusCode).toBe(201);
    expect(response.body.username).toEqual(Users.valid.username);
    expect(response.body.age).toEqual(Users.valid.age);
    expect(response.body.hobbies.length).toEqual(4);
    expect(response.body.id).not.toBeFalsy();

    userId = response.body.id;
  });

  it('should return created user', async () => {
    const response = await testApp.get(`/api/users/${userId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('username');
  });

  it('should update specified user', async () => {
    const response = await testApp.put(`/api/users/${userId}`).send(Users.update);

    expect(response.statusCode).toBe(200);
    expect(response.body.username).toEqual(Users.update.username);
    expect(response.body.age).toEqual(Users.update.age);
    expect(response.body.hobbies.length).toEqual(2);
    expect(response.body.id).toEqual(userId);
  });

  it('should return a non empty array after adding users', async () => {
    const response = await testApp.get('/api/users');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toEqual(1);
  });

  it('should delete user from array', async () => {
    const response = await testApp.delete(`/api/users/${userId}`);

    expect(response.statusCode).toBe(204);
    expect(response.body).toBeFalsy();
  });

  it('should return empty array after deleting an element', async () => {
    const response = await testApp.get('/api/users');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});
