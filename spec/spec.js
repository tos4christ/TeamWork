const Request = require('request');
describe('Server setup', () => {
  let server;
  beforeAll(() => {
    server = require('../server/server');
  });

  describe('Test the server', () => {
    const data = {};
    beforeAll((done) => {
      Request.get('http://localhost:3000/', (err, res, body) => {
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });

    it('Should return status 200', () => {
      expect(data.status).toBe(200);
    });

    it('Should respond with body message', () => {
      expect(data.body).toBe('Request received');
    });

  });

});
