require("dotenv").config();
const session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore({
    uri: process.env.CSTR,
    collection: 'mySessions'
  });

store.on('error', function(error) {
console.log(error);
});

module.exports = store;