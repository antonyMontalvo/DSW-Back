const { url } = require('../config/infoConfig');

const User = {
    userRouter: require('./user/userRouter'),
}

const indexRouter = {}

indexRouter.userRouter = (app) => {
    app.use(url.urlV1, User.userRouter)
}

module.exports = indexRouter;