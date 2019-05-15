const morgan = require('morgan'),
  cors = require('cors'),
  express = require('express'),
  app = express(),
  // ioServerr = require('./server/index')(app),
  { server } = require('./config/infoConfig'),
  PORT = (process.env.PORT || server.port);

require('./config/database');
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

/*
  Server start
*/
app.listen(PORT, () => {
  console.log(`Server runing on: http://localhost:${PORT}`);
  console.log(`Socket server running`);
});

// ioServer.listen(PORT, () => {
//   console.log(`Server runing on: http://localhost:${PORT}`);
//   console.log(`Socket server running`);
// });