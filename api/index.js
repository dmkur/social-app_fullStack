const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();

const {usersRoute, authRoute, commentsRoute, likesRoute, postsRoute, relationshipsRoute} = require('./routes')
const multer = require("multer");

// need to work with cookies
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(cookieParser())

app.get('/ping', (req, res) => {
    res.json('pong')
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({storage: storage})

app.use('/api/upload', upload.single("file"), (req, res) => {
    const file = req.file
    res.json(file.filename)
})

app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/posts', postsRoute)
app.use('/api/comments', commentsRoute)
app.use('/api/likes', likesRoute)
app.use('/api/relationships', relationshipsRoute)

app.listen(8800, () => {
    console.log('App started on port 8800')
})


