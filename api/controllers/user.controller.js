const {db} = require("../connect");
const jwt = require("jsonwebtoken");

module.exports = {
    getUser: (req, res) => {
        const userId = req.params.userId

        const q = "SELECT * FROM users WHERE id=?"

        db.query(q, [userId], (err, data) => {
            if (err) return res.status(500).json(err)
            const {password, ...info} = data[0]
            return res.json(info)
        })
    },
    updateUser: (req, res) => {
        const token = req.cookies.accessToken
        if (!token) return res.status(401).json('Not logged in')

        jwt.verify(token, 'secretKey', (err, userInfo) => {
            if (err) return res.status(403).json("Token is`t valid")

            const q = "UPDATE users SET `name`=?, `city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=?"

            const values = [
                req.body.name,
                req.body.city,
                req.body.website,
                req.body.profilePic,
                req.body.coverPic,
                userInfo.id
            ]

            db.query(q, values, (err, data) => {
                if (err) return res.status(500).json(err)
                // якщо задіяні хоч один вид данних, лише тоді буде оновлення
                if (data.affectedRows > 0) return res.json("Updated")
                return res.status(403).json('Y can update only your post!')
            })
        })
    }
}
