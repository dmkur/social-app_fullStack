const {db} = require("../connect");
const jwt = require("jsonwebtoken");
const moment = require("moment/moment");

module.exports = {
    getComments: (req, res) => {
        const q = "SELECT c.*, u.id as userId, name, profilePic " +
            "FROM comments AS c JOIN users AS u ON (u.id = c.userId)" +
            " WHERE c.postId = ? ORDER BY c.createdAt DESC ";

        db.query(q, [req.query.postId], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.json(data)
        })
    },
    addComment:(req, res) => {
        const token = req.cookies.accessToken
        if (!token) return res.status(401).json('Not logged in')

        jwt.verify(token, 'secretKey', (err, userInfo) => {
            if (err) return res.status(403).json("Token is`t valid")

            const q = "INSERT INTO comments (`desc`,`createdAt`,`userId`, `postId`) VALUES (?)"

            const values = [
                req.body.desc,
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                userInfo.id,
                req.body.postId
            ]

            db.query(q, [values], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.json("Comment has been created")
            })
        })
    }
}