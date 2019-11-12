'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _server = require('../server/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//DONE
describe('Server setup', function () {
  var server = void 0;
  beforeAll(function () {
    server = _server2.default;
  });
  describe('Test the server', function () {
    var data = {};
    beforeAll(function (done) {
      _request2.default.get('http://localhost:3000/test', function (err, res, body) {
        if (err) throw err;
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('Should return status 200', function () {
      expect(data.status).toBe(200);
    });
    it('Should respond with body message', function () {
      expect(data.body).toBe('Request received');
    });
  });
});
//DONE
describe('JWT route protection', function () {
  var server = void 0;
  beforeAll(function () {
    server = _server2.default;
  });

  describe('unauthenticated user should not access protected routes', function () {
    var data = {};
    beforeAll(function (done) {
      _request2.default.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: 'http://localhost:3000/api/v1/articles',
        form: { title: 'test article', article: 'this is a test article', appr_status: true }
      }, function (err, res, body) {
        if (err) throw err;
        data.status = res.statusCode;
        data.body = body;
        done();
      });
    });
    it('should return error 401', function () {
      expect(data.status).toBe(401);
    });
  });

  describe('authenticated user should access protected routes', function () {
    var data = {};
    beforeAll(function (done) {
      _request2.default.post({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/articles',
        form: { title: 'test articles', article: 'this is a test article', appr_status: true }
      }, function (err, res, body) {
        if (err) console.error(err);
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    // specs design
    it('Should return status 200', function () {
      expect(data.status).toBe(200);
    });
    it('Should return a user', function () {
      expect(data.body['data']['title']).toBe('test articles');
    });
  });
});
//DONE
describe('API endpoint tests', function () {
  var server = void 0;
  beforeAll(function () {
    server = _server2.default;
  });

  // DONE
  // describe('POST /auth/create-user', () => {
  //   const data = {};
  //   beforeAll((done) => {
  //     Request.post({
  //       headers: {
  //         'content-type': 'x-www-form-urlencoded',
  //         'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMwNjAzMDIsImV4cCI6MTU3NDUwMDMwMn0.ub6P4wBGuulB_c7TrGv9TtmBvYjMzVx0yfXqWrXDMOE'
  //       },
  //       url: 'http://localhost:3000/api/v1/auth/create-user',
  //       form: {
  //         firstname: 'bimbo',
  //         lastname: 'fetuga',
  //         email: 'bimbo@gmail.com',
  //         employee_password: 'bimbo',
  //         gender: 'female',
  //         jobrole: 'I.T',
  //         employee_no: 902410,
  //         department: 'Sales'
  //       }
  //     }, (err, res, body) => {
  //       if(err) throw err;
  //       data.status = res.statusCode;
  //       data.body = JSON.parse(body);
  //       done();
  //     });
  //   });
  //   // test specs
  //   it('Should return a successfully created employee', () => {
  //     expect(data.body['data']['message']).toBe('User account successfully created');
  //   });
  // });
  // DONE
  describe('POST /auth/signin', function () {
    var data = {};
    beforeAll(function (done) {
      _request2.default.post({
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        url: 'http://localhost:3000/api/v1/auth/signin',
        form: {
          username: 'gnztrade@gmail.com',
          password: 'tosin'
        }
      }, function (err, res, body) {
        if (err) console.error(err);
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    //test specs
    it('Should return a successful login message', function () {
      expect(data.body['status']).toBe('success');
    });
  });
  // DONE
  describe('POST /articles', function () {
    var data = {};
    beforeAll(function (done) {
      _request2.default.post({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/articles',
        form: {
          title: 'my test article',
          article: 'this is a test article creation',
          appr_status: false
        }
      }, function (err, res, body) {
        if (err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    //test spec
    it('Should create and article and return article id', function () {
      expect(data.body['data']['message']).toBe('Article successfully posted');
    });
  });
  // Done
  describe('DELETE /articles/:articleId', function () {
    var data = {};
    beforeAll(function (done) {
      _request2.default.delete({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/articles/25'
      }, function (err, resp, body) {
        if (err) throw err;
        data.status = resp.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    // test specs
    it('Should delete an article', function () {
      expect(data.body["data"]["message"]).toBe("Article successfully deleted");
    });
  });
  // DONE
  describe('GET /articles/:articleId', function () {
    var data = {};
    beforeAll(function (done) {
      _request2.default.get({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/articles/2'
      }, function (err, res, body) {
        if (err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    //test spec
    it('Should return an article with article id equals to 2', function () {
      expect(data.body['data']['id']).toBe(2);
    });
    it('Should return an article with title', function () {
      expect(data.body['data']['title']).toEqual("the changed article title");
    });
  });
  // DONE
  describe('POST /gifs', function () {
    var data = {};
    beforeAll(function (done) {
      var req = _request2.default.post({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/gifs'
      }, function (err, res, body) {
        if (err) console.error(err);
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });

      var form = req.form();
      form.append('gifPost', _fs2.default.createReadStream('Certificate.jpg'));
      form.append('gif_title', 'my first gif test');
      form.append('appr_status', 'false');
      // form.append('gif_id', '303030');
    });
    // spec test
    it('Should return the gif title upon successful creation', function () {
      expect(data.body['data']['title']).toBe('my first gif test');
    });
    it('Should return a successful creation message', function () {
      expect(data.body['status']).toBe('success');
    });
  });
  // Done
  describe('PATCH /articles/:articleId', function () {

    var data = {};
    beforeAll(function (done) {
      _request2.default.patch({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/articles/3',
        form: {
          title: 'updated article title',
          article: 'this is a test article update'
        }
      }, function (err, res, body) {
        if (err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    //test spec
    it('Should update and article and return the article id', function () {
      expect(data.body['data']['title']).toBe('updated article title');
    });
  });
  // Done
  describe('POST /gifs/:gifId/comment', function () {
    var data = {};
    beforeAll(function (done) {
      _request2.default.post({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/gifs/9/comment',
        form: {
          "comments": "This is a new gif comment"
        }
      }, function (err, res, body) {
        if (err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    //test spec
    it('should return a status code of 200', function () {
      expect(data.status).toBe(200);
    });
    it('Should return the new gif comment created', function () {
      expect(data.body["data"]["comment"]).toEqual("This is a new gif comment");
    });
  });
  // Done
  describe('GET /gifs/:gifId', function () {
    var data = {};
    beforeAll(function (done) {
      _request2.default.get({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/gifs/27'
      }, function (err, res, body) {
        if (err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    //test spec
    it('should return a status code of 200', function () {
      expect(data.status).toBe(200);
    });
    it('Should return the gif Title', function () {
      expect(data.body["data"]["title"]).toEqual("my first gif test");
    });
  });
  // Done
  describe('GET /feed', function () {

    var data = {};
    beforeAll(function (done) {
      _request2.default.get({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/feed'
      }, function (err, resp, body) {
        if (err) throw err;
        data.status = resp.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    // test specs
    it('Should return a status code of 200', function () {
      expect(data.body["status"]).toBe("success");
    });
  });
  // Done
  describe('DELETE /gifs/:gifId', function () {

    var data = {};
    beforeAll(function (done) {
      _request2.default.delete({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/gifs/19'
      }, function (err, resp, body) {
        if (err) throw err;
        data.status = resp.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    // test specs
    it('Should delete a gif post', function () {
      expect(data.body["data"]["message"]).toBe("gif post successfully deleted");
    });
    it('Should send a status of 200', function () {
      expect(data["status"]).toBe(200);
    });
  });
  // Done
  describe('POST /articles/:articleId/comment', function () {
    var data = {};
    beforeAll(function (done) {
      _request2.default.post({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwMjMwNywidXNlcm5hbWUiOiJnbnp0cmFkZUBnbWFpbC5jb20iLCJpYXQiOjE1NzMyMjQ2NDEsImV4cCI6MTU3NDY2NDY0MX0.XGlcBEz7rukL9KbrxI2HEcbVSVneFNUD2LTGD09e6Zw'
        },
        url: 'http://localhost:3000/api/v1/articles/7/comment',
        form: {
          "comments": "This is a new article comment"
        }
      }, function (err, res, body) {
        if (err) throw err;
        data.status = res.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    //test spec
    it('should return a status code of 200', function () {
      expect(data.status).toBe(200);
    });
    it('Should return the new article comment created', function () {
      expect(data.body["data"]["comment"]).toEqual("This is a new article comment");
    });
  });
});