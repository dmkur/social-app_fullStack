const bcrypt = require('bcryptjs')
const {db} = require("../connect");

module.exports = {
    register: (req, res) => {
        // check user if exists
        const q = "SELECT * FROM users WHERE username = ?"
        //     ? - дає можливість написати не на пряму я вже в db.query(запит нижче)
        db.query(q, [req.body.username], (err, data) => {
            if (err) return res.status(500).json(err)
            if (data.length) return res.status(409).json('User already exists')
            // hash password
            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(req.body.password, salt)

            const q = "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)"
            const values = [req.body.username, req.body.email, hashedPassword, req.body.name]

            db.query(q, [values], (err) => {
                if (err) return res.status(500).json(err)
                return res.status(200).json('User has been created')
            })
        })

    },
    login: (req, res) => {
        res.json("Test")
    },
    logout: () => {
    }
}
