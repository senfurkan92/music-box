const userModel = require("../models/userModel");
const {validationResult} = require("express-validator") ;
const {ResultModel, ResultDataModel} = require("../models/resultModel");
const {check, getHash} = require("../config/crypt");
const {verifyToken, generateToken} = require("../config/auth");
const {decode} = require("jsonwebtoken")

const signUpAction = async (req,resp,next) => {
    const errors = validationResult(req);
    let result = null;
    if(errors.isEmpty()){
        let user = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            password: await getHash(req.body.password),
            country: req.body.country
        }
        let insertResult = null;
        try {
            insertResult = await userModel.create(user);           
            if(insertResult) {
                result = new ResultDataModel(true, insertResult, "inserted");
            } else {
                result = new ResultDataModel(false, null, "not inserted");
            }
        } catch (error) {
            result = new ResultDataModel(false, null, "not inserted", ["have already been used email"]);
        }
    } else {
        result = new ResultModel(false, "error", errors.array().map(x => `${x.msg} for ${x.param}`))
    }
    resp.json(result);
} 

const signInAction = async (req,resp,next) => {
    const errors = validationResult(req);
    let result = null;
    if(errors.isEmpty()){
        let user = await userModel.findOne({email: req.body.email});
        if(user) {
            if (await check(req.body.password, user.password)) {
                const token = generateToken(user, '24h');
                let data = {
                    token: token,
                    user: user
                }
                req.session.token = token;
                result = new ResultDataModel(true, data, "valid login");
            } else {
                result = new ResultModel(false, "password is invalid", ['password is invalid']);
            }
        } else {
            result = new ResultModel(false, "user not found", ['user not found']);
        }
    } else {
        result = new ResultModel(false, "error", errors.array().map(x => `${x.msg} for ${x.param}`))
    }
    resp.json(result);
} 

const autoSignInAction = async (req, resp, next) => {
    result = new ResultDataModel(true, decode(req.headers['authorization']).user, "");
    resp.json(result);
}

module.exports = {
    signUpAction,
    signInAction,
    autoSignInAction
}