const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server listening on port ${PORT}`);
});
