require('dotenv').config();
require('./src/config/database').connect();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUI = require('swagger-ui-express');
const exphbs = require('express-handlebars');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const flash = require('express-flash');

const passport = require('passport');
require('./src/config/passport')(passport);

const docs = require('./docs');

const indexRouter = require('./src/routes/index');
const wordRouter = require('./src/routes/words');
const langRouter = require('./src/routes/languages');
const authRouter = require('./src/routes/auth');
const testRouter = require('./src/routes/test');

const app = express();

const hbs = exphbs.create({
  helpers: {
    firstName: (user) => user.firstName,
    lastName: (user) => user.lastName,
    email: (user) => user.email,
  },
  extname: '.hbs',
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

const redisClient = redis.createClient({
  host: process.env.REDIS_URI,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

app.use(
  session({
    secret: process.env.REDIS_SECRET,
    store: new RedisStore({
      client: redisClient,
    }),
    saveUninitialized: false,
    resave: false,
  }),
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// MIDDLEWARE
app.use((req, res, next) => {
  // console.log('in this middleware');
  res.locals.user = req.user;
  // console.log({localsUser: res.locals.user});
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

app.use('/', indexRouter);
app.use('/words', wordRouter);
app.use('/languages', langRouter);
app.use('/auth', authRouter);
app.use('/test/', testRouter);

redisClient.on('connect', () => {
  console.log('connected');
});

module.exports = app;
