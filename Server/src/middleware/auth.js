const jwt = require("jsonwebtoken")
const { sqlModel } = require("../mysql")

const authentication = function (req, res, next) {

    try {
        let token = req.headers["x-api-key"]
        if (!token) { return res.status(400).send({ status: false, msg: "Header key is missing" }) }

        jwt.verify(token, "todo web app", function (err, decode) {
            if (err) { return res.status(401).send({ status: false, msg: "Authentication failed" }) }
            req.id = decode.id;
            next();
        })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}



const authorization = async function (req, res, next) {

    try {
        let data = req.params;

        let { id, userId } = data

        if (id && !userId) { userId = id }

        sqlModel.query(`select * from todouser where id=${userId}`, (err, data) => {
            if (err) { return res.status(400).send({ status: false, message: err.message }) }
            else {
                if (data.length == 0) { return res.status(404).send({ status: false, message: "User not found !" }) }
                if (req.id != userId) { return res.status(403).send({ status: false, msg: "Authorization failed" }) }
                next()
            }
        })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { authentication, authorization }