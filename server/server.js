const http = require('http');
const app = require('../app');

port = process.env.PORT || 3000;
host = process.env.HOST || 'localhost';

server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`server listening on port ${port}`);
});