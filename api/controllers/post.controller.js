const {db} = require("../connect");

module.exports = {
    getPosts: (req, res, next)=>{
         const q = "SELECT p.*, u.id as userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) ";

         db.query(q,(err, data)=>{
             if(err) return res.status(500).json(err)
             return res.json(data)
         })
    }
}
