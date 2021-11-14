require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (user, expireIn) => {
    let data = {...user};
    delete data.password;
    let token = jwt.sign({
        user
      }, process.env.SECRETKEY, { expiresIn: expireIn });
    return token;
}

const verifyToken = (token) => {
    let verify = jwt.verify(token, process.env.SECRETKEY, {    
        ignoreExpiration : true
    });
    return verify;
}

module.exports = {
    generateToken,
    verifyToken
};

