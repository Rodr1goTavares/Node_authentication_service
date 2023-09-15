require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY || "eldenring";

class tokenService {
    static generateToken(id, username, email) {
        const payload = {
            id: id,
            username: username,
            email: email
          };
        return jwt.sign(payload, secretKey, {"expiresIn": "1h"});
    }
}

module.exports = tokenService;