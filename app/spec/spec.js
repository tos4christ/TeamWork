import Request from 'request';
import fs from 'fs';
import servers from '../server/server';

describe('Server setup', () => {
  let server;
  beforeAll(() => {
    server = servers;
  });
  describe('Test the server', () => {
    const data = {};
    beforeAll((done) => {
      Request.get('http://localhost:3000/test', (err, res, body) => {
        if (err) throw err;
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

describe('API endpoint tests', () => {
  let server;
  beforeAll(() => {
    server = servers;
  });
  describe('POST /auth/signin', () => {
    const data = {};
    beforeAll((done) => {
      Request.post({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        url: 'http://localhost:3000/api/v1/auth/signin',
        form: {
          username: 'gnztrade@gmail.com',
          password: 'tosin',
        },
      }, (err, res, body) => {
        if (err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Should return a successful login message', () => {
      expect(data.body.status).toBe('success');
    });
  });
  describe('POST /articles', () => {
    const data = {};
    beforeAll((done) => {
      Request.post({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw',
        },
        url: 'http://localhost:3000/api/v1/articles',
        form: {
          title: 'my test article',
          article: 'this is a test article creation',
          appr_status: false,
        },
      }, (err, res, body) => {
        if (err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Should create and article and return article id', () => {
      expect(data.body.data.message).toBe('Article successfully posted');
    });
    it('Should return a status code 201', () => {
      expect(data.status).toBe(201);
    });
  });
  describe('DELETE /articles/:articleId', () => {
    const data = {};
    beforeAll((done) => {
      Request.delete({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw',
        },
        url: 'http://localhost:3000/api/v1/articles/7',
      }, (err, resp, body) => {
        if (err) throw err;
        data.status = resp.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Should delete an article', () => {
      expect(data.body.data.message).toBe('Article successfully deleted');
    });
    it('Should return a status code 200', () => {
      expect(data.status).toBe(200);
    });
  });
  describe('GET /articles/:articleId', () => {
    const data = {};
    beforeAll((done) => {
      Request.get({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw',
        },
        url: 'http://localhost:3000/api/v1/articles/2',
      }, (err, res, body) => {
        if (err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Should return an article with article id equals to 2', () => {
      expect(data.body.data.id).toBe(2);
    });
    it('Should return an article with title', () => {
      expect(data.body.data.title).toEqual('the changed article title');
    });
  });
  describe('PATCH /articles/:articleId', () => {
    const data = {};
    beforeAll((done) => {
      Request.patch({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw',
        },
        url: 'http://localhost:3000/api/v1/articles/3',
        form: {
          title: 'updated article title',
          article: 'this is a test article update',
        },
      }, (err, res, body) => {
        if (err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Should update and article and return the article id', () => {
      expect(data.body.data.title).toBe('updated article title');
    });
    it('Should return a status code 200', () => {
      expect(data.status).toBe(200);
    });
  });
  describe('POST /gifs/:gifId/comment', () => {
    const data = {};
    beforeAll((done) => {
      Request.post({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw',
        },
        url: 'http://localhost:3000/api/v1/gifs/7/comment',
        form: {
          comment: 'This is a new gif comment',
        },
      }, (err, res, body) => {
        if (err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('should return a status code of 201', () => {
      expect(data.status).toBe(201);
    });
    it('Should return the new gif comment created', () => {
      expect(data.body.data.comment).toEqual('This is a new gif comment');
    });
  });
  describe('GET /gifs/:gifId', () => {
    const data = {};
    beforeAll((done) => {
      Request.get({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw',
        },
        url: 'http://localhost:3000/api/v1/gifs/9',
      }, (err, res, body) => {
        if (err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('should return a status code of 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should return the gif Title', () => {
      expect(data.body.data.title).toEqual('my first gif test');
    });
  });
  describe('GET /feed', () => {
    const data = {};
    beforeAll((done) => {
      Request.get({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw',
        },
        url: 'http://localhost:3000/api/v1/feed',
      }, (err, resp, body) => {
        if (err) throw err;
        data.status = resp.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Should return a status code of 200', () => {
      expect(data.body.status).toBe('success');
    });
  });
  describe('POST /articles/:articleId/comment', () => {
    const data = {};
    beforeAll((done) => {
      Request.post({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw',
        },
        url: 'http://localhost:3000/api/v1/articles/2/comment',
        form: {
          comment: 'This is a new article comment',
        },
      }, (err, res, body) => {
        if (err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('should return a status code of 201', () => {
      expect(data.status).toBe(201);
    });
    it('Should return the new article comment created', () => {
      expect(data.body.data.comment).toEqual('This is a new article comment');
    });
  });
  describe('POST /gifs', () => {
    const data = {};
    beforeAll((done) => {
      const req = Request.post({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw',
        },
        url: 'http://localhost:3000/api/v1/gifs',
      }, (err, res, body) => {
        if (err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
      const form = req.form();
      form.append('gifPost', fs.createReadStream('Certificate.jpg'));
      form.append('gif_title', 'my another gif test');
      form.append('appr_status', 'true');
    });
    it('Should return the gif title upon successful creation', () => {
      expect(data.body.data.title).toBe('my another gif test');
    });
    it('Should return a successful creation message', () => {
      expect(data.body.status).toBe('success');
    });
    it('Should return a status code 201', () => {
      expect(data.status).toBe(201);
    });
  });
  describe('POST /auth/create-user', () => {
    const data = {};
    beforeAll((done) => {
      Request.post({
        headers: {
          'content-type': 'x-www-form-urlencoded',
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzM1ODE5MjAsImV4cCI6MTU3NTAyMTkyMH0.js2EySKM5sykjUELWrA3jD2acVSwU_1lDooVIGKbp24',
        },
        url: 'http://localhost:3000/api/v1/auth/create-user',
        form: {
          firstname: 'test',
          lastname: 'testing',
          email: 'test@example.com',
          employee_password: 'tested',
          gender: 'female',
          jobrole: 'I.T',
          employee_no: 112,
          department: 'Admin',
        },
      }, (err, res, body) => {
        if (err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Should return a successfully created employee', () => {
      expect(data.body.data.message).toBe('User account successfully created');
    });
    it('Should return a status of 201', () => {
      expect(data.status).toBe(201);
    });
  });
  describe('DELETE /gifs/:gifId', () => {
    const data = {};
    beforeAll((done) => {
      Request.delete({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw',
        },
        url: 'http://localhost:3000/api/v1/gifs/13',
      }, (err, resp, body) => {
        if (err) throw err;
        data.status = resp.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Should delete a gif post', () => {
      expect(data.body.data.message).toBe('gif post successfully deleted');
    });
    it('Should send a status of 200', () => {
      expect(data.status).toBe(200);
    });
  });
});

describe('JWT route protection', () => {
  let server;
  beforeAll(() => {
    server = servers;
  });
  describe('unauthenticated user should not access protected routes', () => {
    const data = {};
    beforeAll((done) => {
      Request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: 'http://localhost:3000/api/v1/articles',
        form: { title: 'test article', article: 'this is a test article', appr_status: true },
      }, (err, res, body) => {
        if (err) console.error(err);
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('should return error 401', () => {
      expect(data.status).toBe(401);
    });
  });
  describe('authenticated user should access protected routes', () => {
    const data = {};
    beforeAll((done) => {
      Request.post({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw',
        },
        url: 'http://localhost:3000/api/v1/articles',
        form: { title: 'test articles', article: 'this is a test article', appr_status: true },
      }, (err, res, body) => {
        if (err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Should return status 201', () => {
      expect(data.status).toBe(201);
    });
    it('Should return a user', () => {
      expect(data.body.data.title).toBe('test articles');
    });
  });
});
