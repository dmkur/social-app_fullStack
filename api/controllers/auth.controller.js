const bcrypt = require('bcryptjs')
const {db} = require("../connect");
const jwt = require('jsonwebtoken')

module.exports = {
    register: (req, res) => {
        // check user if exists
        const q = "SELECT * FROM users WHERE username = ?"
        // ? - дає можливість написати не на пряму я вже в db.query(запит нижче)
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
        const q = "SELECT * FROM users WHERE username = ?"
        // return array
        db.query(q, [req.body.username], (err, data) => {
            if (err) return res.status(500).json(err)
            if (data.length === 0) return res.status(404).json('User not found')

            const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)
            // data[0].password - це наш юзер в базі, оск він в масиві згідно рядку 27

            if (!checkPassword) return res.status(400).json("Wrong password or username!")

            const token = jwt.sign({id: data[0].id}, 'secretKey')

            // так ми відділили усі дані юзера від паролю, його ми не віддаємо
            const {password, ...others} = data[0]


            res.cookie('accessToken', token, {
                httpOnly: true
            }).status(200).json(others)
        })
    },
    logout: (req, res) => {
    //     delete cookie
        res.clearCookie('accessToken',{
            secure: true,
            // різний порт автоматично блокує кукі реакт 3300, апка 88
            // ція опція відключить блокування
            sameSite: "none"
        }).status(200).json("User has been logged out.")
    }
}
