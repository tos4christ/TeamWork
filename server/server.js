const http = require('http');
const app = require('../app');

port = process.env.PORT;
host = process.env.HOST;

server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`server listening on port ${port}`);
});