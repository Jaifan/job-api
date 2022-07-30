require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const dbConnect = require('./db/dbConnect');
const notfound = require('./middleware/notfound');
const errorHandleMiddleware = require('./middleware/error-handle');
const authentication = require('./middleware/authenticatoin');
const Auth = require('./routers/auth');
const Jobs = require('./routers/jobs');

// Security Feature
const helmet = require('helmet');
const cors = require('cors');
const xssClean = require('xss-clean');
const rateLimiter = require('express-rate-limit');

//middleware
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xssClean());

//Routing
app.get('/', (req,res)=> {res.send('<h1>JOBS API</h1>')});
app.use('/api/v1/auth', Auth);
app.use('/api/v1/jobs', authentication ,Jobs);

//errorHandling
app.use(notfound);
app.use(errorHandleMiddleware);


// Port
dbConnect(); 

const start = () => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
}

start();