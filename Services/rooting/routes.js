const express = require('express');

const publicRouter = express.Router();
const toGraphWriterRoute = require('./routes/toGraphWriter');
const toDataWriterRoute = require('./routes/toDataWriter');
const toDatabaseReaderRoute = require('./routes/toDatabaseReader');
const toRenderServiceRoute = require('./routes/toRenderService');

publicRouter.use('/', toGraphWriterRoute);
publicRouter.use('/', toDataWriterRoute);
publicRouter.use('/', toDatabaseReaderRoute);
publicRouter.use('/', toRenderServiceRoute);

module.exports = publicRouter;