const http = require('http');
const net = require('net');

const server = http.createServer((req, res) => {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: req.url,
    method: req.method,
    headers: {
      ...req.headers,
      host: 'localhost:3000',
    },
  };

  const proxy = http.request(options, (targetRes) => {
    res.writeHead(targetRes.statusCode, targetRes.headers);
    targetRes.pipe(res, { end: true });
  });

  proxy.on('error', (err) => {
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Gateway Error: ' + err.message);
  });

  req.pipe(proxy, { end: true });
});

// Support WebSocket (Next.js HMR)
server.on('upgrade', (req, socket, head) => {
  const proxySocket = net.connect(3000, 'localhost', () => {
    proxySocket.write(
      `${req.method} ${req.url} HTTP/1.1\r\n` +
      Object.entries(req.headers)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\r\n') +
      '\r\n\r\n'
    );
    proxySocket.pipe(socket);
    socket.pipe(proxySocket);
  });

  proxySocket.on('error', () => {
    socket.destroy();
  });
});

server.listen(3001, () => {
  console.log('Proxy listening on port 3001 and forwarding to port 3000');
});
