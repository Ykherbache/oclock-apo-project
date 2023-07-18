import { createTestingApp as app } from '../../../app/app.js'; // this is your express app
import request from 'supertest';
describe('GET /', () => {
  it('responds with a json message', function () {
    return request(app())
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
