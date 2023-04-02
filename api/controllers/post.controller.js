const {db} = require("../connect");
const jwt = require("jsonwebtoken");
const moment = require("moment");

module.exports = {
    getPosts: (req, res, next) => {
        const token = req.cookies.accessToken
        if (!token) return res.status(401).json('Not logged in')

        jwt.verify(token, 'secretKey', (err, userInfo) => {
            // оск, при ств токену ми викор userID ми отрим. йоно з useerInfo.id
            if (err) return res.status(403).json('Token is`t valid')

            // перша кверя підтягує пости + нашого юзера, друга обирає лише пости юзерів на які ми підписані
            const q = "SELECT p.*, u.id as userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships as r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId=? ORDER BY createdAt DESC ";

            db.query(q, [userInfo.id, userInfo.id], (err, data) => {
                if (err) return res.status(500).json(err)
                return res.json(data)
            })
        })
    },
    addPost: (req, res) => {
        const token = req.cookies.accessToken
        if (!token) return res.status(401).json('Not logged in')

        jwt.verify(token, 'secretKey', (err, userInfo) => {
            if (err) return res.status(403).json("Token is`t valid")

            const q = "INSERT INTO posts (`desc`,`img`,`createdAt`,`userId`) VALUES (?)"

            const values = [
                req.body.desc,
                req.body.img,
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                userInfo.id,
            ]

            db.query(q, [values], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.json("Post has been created")
            })
        })
    }
}
