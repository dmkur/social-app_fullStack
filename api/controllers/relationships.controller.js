const {db} = require("../connect");
const jwt = require("jsonwebtoken");

module.exports = {
    getRelationships: (req, res) => {
        const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?"

        db.query(q, [req.query.followedUserId], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.json(data.map(relationships => relationships.followerUserId))
        })
    },

    addRelationships: (req, res) => {
        const token = req.cookies.accessToken;
        if (!token) return res.status(401).json('Not logged in')

        jwt.verify(token, 'secretKey', (err, userInfo) => {
            if (err) return res.status(403).json("Token in not valid")

            const q = "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)"

            const values = [
                userInfo.id,
                req.body.userId
            ]

            db.query(q, [values], (err, data) => {
                if (err) return res.status(500).json(err)
                return res.json("Following")
            })
        })


    },

    deleteRelationships: (req, res) => {
        const token = req.cookies.accessToken;
        if(!token) return res.status(401).json('Not logged in')

        jwt.verify(token, 'secretKey', (err, userInfo) => {
            if (err) return res.status(403).json("Token in not valid")

            const q = "DELETE FROM relationships WHERE `followerUserId`=? AND `followedUserId`=? "

            db.query(q, [userInfo.id, req.query.userId], (err, data) => {
                if (err) return res.status(500).json(err)
                return res.json("Unfollow")
            })
        })
    }
}