const express = require('express')

const app = express();

const {usersRoute, authRoute, commentsRoute, likesRoute, postsRoute} = require('./routes')

app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/posts', postsRoute)
app.use('/api/comments', commentsRoute)
app.use('/api/likes', likesRoute)

app.listen(8800, () => {
    console.log('App started on port 8800')
})


