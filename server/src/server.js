const express = require('express');
const path = require('node:path');
const { createServer } = require('node:http');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { StatusCodes } = require('http-status-codes');

const { config } = require('./config');
const { initDB } = require('./db');
const { appRoutes } = require('./routes');
const { isApiError } = require('./shared/errors');
const { initWS } = require('./socket');

const app = express();
const server = createServer(app);

app.use(morgan('tiny'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/health', (req, res) => {
  res.json({ message: 'ok' });
});

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.use(appRoutes);

app.use((err, req, res, _next) => {
  if (isApiError(err)) {
    console.log(err.message);
    return res.status(err.status).json({ message: err.message });
  }
  console.error(`Unhandled error occurred\n${err.message}\n${err.stack}`);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Some error occurred, please try after some time.' });
});

async function main() {
  initWS(server);
  await initDB();
  server.listen(config.port, () => {
    console.log(`Server started on http://localhost:${config.port}`);
  });
}

if (require.main === module) {
  main().catch(console.error);
}
