const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const { logger, log } = require('./logger');
const app = express();
const port = process.env.PORT || 8080;

// configuration lib middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// set logging
app.use(
  morgan(
    ':date[iso] [HTTP REQUEST] :url :method :status :res[content-length] - :response-time ms',
    {
      stream: logger.stream.write,
      skip: () => process.env.NODE_ENV === 'test',
    }
  )
);

//configure routes
require('./routes')(app);

// listening
app.listen(port, () => console.log(`Server magic happens on port - ${port}`));
