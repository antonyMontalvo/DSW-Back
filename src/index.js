const morgan = require('morgan'),
  cors = require('cors'),
  path = require('path'),
  express = require('express'),
  expbhs = require('express-handlebars'),
  app = express();

const PORT = (process.env.PROYECT_PORT || process.env.PORT || 5000),
  HOST = process.env.YOUR_HOST || '0.0.0.0';
  indexRouter = require('./routes/index');

/*
Settings
*/
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // variables de entorno
}
require('./config/database'); // mongoDB
app.set('port', PORT);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expbhs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));

/*
  Static files
*/
app.use(express.static(path.join(__dirname + '/public')));

/*
  Middlewares
*/
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/*
  Global variables
*/
app.use((req, res, next) => {
  next();
});

/*
  Routes
*/
indexRouter.userRouter(app);

/*
  Server start
*/
app.listen(app.get('port'), HOST, () => {
  console.log(`Server runing on: http://localhost:${app.get('port')}`);
});
