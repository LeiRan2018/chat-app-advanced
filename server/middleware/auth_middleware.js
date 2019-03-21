
var jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authMiddleware = async function (req, res, next) {
    try {
        let token = req.headers.authorization.split(" ")[1];
        var decodedToken = jwt.verify(token, 'secret');
        let email = decodedToken.email;
        if (email !== null) {
            // find user with matching email
            const matched = await User.findOne({
                where: { email: email }
            });
            if (
                matched
            ) {
                next();
            } else {
                res.status(403).end('Forbidden');
            }
        } else {
            res.status(401).end('Unauthorized');
        }

    } catch (e) {
        throw Error('error occured authorized');
    }
}