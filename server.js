const express = require('express');
const next = require('next');
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./api');
const yes = require('yes-https');

const PORT = process.env.PORT || 3000;

const isDev = process.env.NODE_ENV !== 'production';
const app = next({ dev: isDev });
const handle = app.getRequestHandler();

app.prepare()
.then(() => {
  const server = express();

  if (!isDev) {
    server.use(yes());
  }

  server.use(cors());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  api(server);

  server.use('/assets', express.static('assets'));

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
})
.catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
