"use strict";

require('dotenv-extended').load();
const log4js = require('log4js');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dispatcher = require('./web/questionnaire-controller');

const logger = log4js.getLogger('server');
log4js.configure('log4js.json');

mongoose.Promise = global.Promise;
const url = 'mongodb://' + process.env.MONGO_HOST + '/' + process.env.MONGO_DATABASE;
mongoose.connect(url, {
  useNewUrlParser: true
});

// Read the properties from file '.env' and '.env.defaults'.
// silent: true - no log message is shown when missing the .env or .env.defaults files.
const PORT = process.env.PORT || 9090;

let app = express()

app.use(bodyParser.json())
app.use('/flashcard-express', dispatcher);
app.listen(PORT)

// Put a friendly message on the terminal
logger.info(`Server running on ${PORT}`);
