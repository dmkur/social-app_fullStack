const {db} = require("../connect");
const jwt = require("jsonwebtoken");
const moment = require("moment");

module.exports = {
    getPosts: (req, res) => {
        const userId = req.query.userId
        const token = req.cookies.accessToken
        if (!token) return res.status(401).json('Not logged in')

        jwt.verify(token, 'secretKey', (err, userInfo) => {
            // оск, при ств токену ми викор userID ми отрим. йоно з useerInfo.id
            if (err) return res.status(403).json('Token is`t valid')

            // якщо у нас є userId, отже ми в профайлі
            // і нам потрібні лише пости даного юзера - тобто перша умова
            const q = userId !== "undefined"
                ? "SELECT p.*, u.id as userId, name, profilePic " +
                "FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY createdAt DESC"

                : "SELECT p.*, u.id as userId, name, profilePic " +
                "FROM posts AS p JOIN users AS u ON (u.id = p.userId) " +
                "LEFT JOIN relationships as r ON (p.userId = r.followedUserId) " +
                "WHERE r.followerUserId = ? OR p.userId=? ORDER BY createdAt DESC";
            // перша кверя підтягує пости + нашого юзера, друга обирає лише пости юзерів на які ми підписані

            const values = userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]

            db.query(q, values, (err, data) => {
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
    },
    deletePost: (req, res) => {
        const token = req.cookies.accessToken
        if (!token) return res.status(401).json('Not logged in')

        jwt.verify(token, 'secretKey', (err, userInfo) => {
            if (err) return res.status(403).json("Token is`t valid")

            const q = "DELETE FROM posts WHERE `id`=? AND `userId`=?"


            db.query(q, [req.params.id,userInfo.id], (err, data) => {
                if (err) return res.status(500).json(err);
                if(data.affectedRows > 0) return res.json("Post has been deleted")
                return res.status(403).json("You can delete only your post")
            })
        })
    },
}
