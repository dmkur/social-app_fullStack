const jwt = require("jsonwebtoken");
const {db} = require("../connect");

module.exports = {
    getLikes: (req, res) => {
        const q = "SELECT userId FROM likes WHERE postId = ?";

        db.query(q, [req.query.postId], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.json(data.map(like => like.userId))
        })
    },
    addLike: (req, res) => {
        const token = req.cookies.accessToken;
        if (!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, 'secretKey', (err, userInfo) => {
            if (err) return res.status(403).json("Token is not valid!")

            const q = "INSERT INTO likes(`userId`,`postId`) VALUES (?)";
            const values = [
                userInfo.id,
                req.body.postId
            ]

            db.query(q, [values], (err, data) => {
                if (err) return res.status(500).json(err)
                return res.json("Post has been liked")
            })

        })
    },
    deleteLike: (req, res) => {
        const token = req.cookies.accessToken;
        if (!token) return res.status(401).json('Not logged in')

        jwt.verify(token, 'secretKey', (err, userInfo) => {
            if (err) return res.status(403).json('Token is not valid')

            const q = "DELETE from likes WHERE `userid`=? AND `postId`= ?"

            db.query(q, [userInfo.id, req.query.postId], (err, data) => {
                if (err) return res.status(500).json(err)
                return res.json("Like has been deleted")
            })

        })
    }
}