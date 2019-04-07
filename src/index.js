const morgan = require('morgan'),
  cors = require('cors'),
  express = require('express'),
  app = express(),
  ioServer = require('./server/index')(app),
  PORT = (process.env.PORT || 5000);

/*
  Settings
*/
app.set("port", PORT);


/*
  Static files
*/


/*
  Middlewares
*/
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
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

/*
  Server start
*/
ioServer.listen(PORT, () => {
  console.log(`Server runing on: http://localhost:${PORT}`);
  console.log(`Socket server running`);
});