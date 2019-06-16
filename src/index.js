const morgan = require('morgan'),
  cors = require('cors'),
  path = require('path'),
  express = require('express'),
  multer = require('multer'),
  app = express();

const { server } = require('./config/infoConfig'),
  PORT = (process.env.PORT || server.port),
  indexRouter = require('./routes/index');

/*
Settings
*/
require('./config/database'); // mongoDB
app.set('port', PORT);
app.set('views', path.join(__dirname, 'views'));

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
app.use(multer({
  storage: multer.diskStorage({
      destination: path.join(__dirname, 'public/files'),
      filename: (req, file, cb) => {
          cb(null, file.originalname)
      }
  }),
  dest: path.join(__dirname, 'public/files')
}).single('fileimage'));

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
app.listen(app.get('port'), () => {
  console.log(`Server runing on: http://${server.host}:${app.get('port')}`);
});
