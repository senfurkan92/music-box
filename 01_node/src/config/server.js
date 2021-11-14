require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const homeRouter = require('../router/homeRouter');
const userRouter = require('../router/signRouter');
const songRouter = require('../router/songRouter');
const cors = require('cors');
const store = require('./store');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(session({
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
    },
    store: store
}));
app.use(cors());
app.use("/", homeRouter);
app.use("/user",userRouter);
app.use("/song",songRouter);

module.exports = () => {
    return app.listen(process.env.PORT, ()=> console.log('serve on'));
}