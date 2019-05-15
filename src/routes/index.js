
const User = {
    userRouter: require('./user/userRouter'),
}

const indexRouter = {}

indexRouter.userRoutes = (app) => {
    app.use(User.userRouter)
}

module.exports = indexRouter;