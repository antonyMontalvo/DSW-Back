const morgan = require('morgan'),
  cors = require('cors'),
  path = require('path'),
  express = require('express'),
  multer = require('multer'),
  app = express();

const PORT = (process.env.PORT || 5000),
  indexRouter = require('./routes/index');

/*
Settings
*/
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config(); // variables de entorno
}
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
}).single('file'));

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
  console.log(`Server runing on: http://localhost:${app.get('port')}`);
});
