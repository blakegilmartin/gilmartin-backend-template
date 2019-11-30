const express = require('express');
const bodyParser = require('body-parser');
const templateRoute = require('./routes/templateRoute');

const app = express();
let port = 8181;
app.use(bodyParser.json());
app.use('/template', templateRoute);

const startServer = () => {
  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`Server listening on port ${port}`));
};

const server = {
  startServer,
};

module.exports = (inputPort) => {
  port = inputPort || 8181;
  return server;
};

module.exports = server;
