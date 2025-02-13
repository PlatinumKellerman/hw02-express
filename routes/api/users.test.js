const mongoose = require('mongoose');
const request = require('supertest');
require('dotenv').config();

const app = require('../../app');
const { User } = require('../../models/user');

const { DB_TEST_HOST, PORT } = process.env;

describe('test users routes', () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach(async () => await mongoose.connect(DB_TEST_HOST));

  afterEach(async () => {
    await mongoose.connection.db.dropCollection(async () => {
      await mongoose.connection.close();
    });
  });

  test('test login route', async () => {
    const newUser = {
      email: 'chupa@gmail.com',
      password: '12121212',
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: 'chupa@gmail.com',
      password: '12121212',
    };

    const response = await request(app).post('/api/users/login').send(loginUser);
    expect(response.statusCode).toBe(200);
    const { body } = response;
    expect(body.token).toByTruthy();
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
  });
});
