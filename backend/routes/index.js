const userRouter = require('./userRouter')
const lessonRouter = require('./lessonRouter')
const commentRouter = require('./commentRouter')
const contactRouter = require('./contactRouter')
const scoreRouter = require('./scoreRouter')

function route(app) {
    app.use('/user', userRouter)
    app.use('/lesson',lessonRouter)
    app.use('/comment',commentRouter)
    app.use('/contact',contactRouter)
    app.use('/score',scoreRouter)

}


module.exports = route