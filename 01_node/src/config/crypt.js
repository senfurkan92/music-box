const {hash, compare} = require("bcrypt");
const saltRounds = 10;

const getHash = (password) => {
    return hash(password, saltRounds);
}

const check = (password, hashedPassword) => {
    return compare(password, hashedPassword);
}

module.exports = {
    getHash,
    check
}