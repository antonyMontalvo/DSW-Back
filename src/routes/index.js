const User = {
    userRouter: require('./userRouter'),
}

const indexRouter = {}

indexRouter.userRouter = (app) => {
    app.use(process.env.PROYECT_URL, User.userRouter)
}

module.exports = indexRouter;