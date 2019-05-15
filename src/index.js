const morgan = require('morgan'),
  cors = require('cors'),
  path = require('path'),
  express = require('express'),
  app = express();

const { server } = require('./config/infoConfig'),
  PORT = (process.env.PORT || server.port),
  indexRouter = require('./routes/index');

/*
Settings
*/
require('./config/database');
app.set("port", PORT);
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

/*
  Static files
*/
app.use('/public/user', express.static(__dirname + '/public/images/user'));

/*
  Middlewares
*/
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*
  Global variables
*/
app.use((req, res, next) => {
  next();
});

/*
  Routes
*/
indexRouter.userRoutes(app);

/*
  Server start
*/
app.listen(PORT, () => {
  console.log(`Server runing on: http://localhost:${PORT}`);
  console.log(`Socket server running`);
});
