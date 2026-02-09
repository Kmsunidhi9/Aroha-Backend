const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

jest.mock('../models/User');

jest.mock('bcryptjs', () => ({
  genSalt: jest.fn(),
  hash: jest.fn()
}));

describe('Authenticate Routes', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {

    it('should return 400 if user already exists', async () => {
      User.findOne.mockResolvedValue({
        email: 'test@example.com'
      });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: '123456'
        });

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(res.statusCode).toBe(400);
      expect(res.body.status).toBe('failure');
      expect(res.body.data.message).toBe('User already exists');
    });

    it('should register user successfully', async () => {
      User.findOne.mockResolvedValue(null);

      bcrypt.genSalt.mockResolvedValue('randomSalt');
      bcrypt.hash.mockResolvedValue('hashedPassword');

      User.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(true)
      }));

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'newuser',
          email: 'new@example.com',
          password: '123456'
        });

      expect(User.findOne).toHaveBeenCalledWith({ email: 'new@example.com' });
      expect(bcrypt.genSalt).toHaveBeenCalledWith(6);
      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 'randomSalt');

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.message).toBe('User registered successfully');
    });

    it('should return 500 if an error occurs', async () => {
      User.findOne.mockRejectedValue(new Error('Database failure'));

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'erroruser',
          email: 'error@example.com',
          password: '123456'
        });

      expect(res.statusCode).toBe(500);
      expect(res.body.message).toBe('Database failure');
    });
  });
});
