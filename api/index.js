const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();

const {usersRoute, authRoute, commentsRoute, likesRoute, postsRoute} = require('./routes')

// need to work with cookies
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)

    next()
})

app.use(express.json())
app.use(cors({
    origin:'http://localhost:3000'
}))
app.use(cookieParser())

app.get('/ping', (req, res) => {
    res.json('pong')
})

app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/posts', postsRoute)
app.use('/api/comments', commentsRoute)
app.use('/api/likes', likesRoute)

app.listen(8800, () => {
    console.log('App started on port 8800')
})


