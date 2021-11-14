const {body} = require("express-validator");

const signUpValidation = () => {
    return [
        body('name')
            .trim()
            .notEmpty().withMessage("required")
            .isAlpha('en-US',{ignore: ' '}).withMessage("only en-US aplhabetic characters")
            .isLength({max:50}).withMessage("max length 50"),
        body('email')
            .trim()
            .notEmpty().withMessage("required")
            .isEmail().withMessage("invalid e-mail"),
        body('age')
            .trim()
            .notEmpty().withMessage("required")
            .isNumeric().withMessage("only numeric characters"),
        body('password')
            .trim()
            .notEmpty().withMessage("required")
            .isStrongPassword({minSymbols:0}).withMessage("not strong enough password to protect"),
        body('country')
            .trim()
            .notEmpty().withMessage("required")
    ]
}

const signInValidation = () => {
    return [
        body('email')
            .trim()
            .notEmpty().withMessage("required")
            .isEmail().withMessage("invalid e-mail"),
        body('password')
            .trim()
            .notEmpty().withMessage("required")
    ]
}

const songUploadValidation = () => {
    return [
        body('name')
            .trim()
            .notEmpty().withMessage('required')
            .isLength({max:50}).withMessage("max 50 characters"),
        body('path')
            .trim()
            .notEmpty().withMessage('required')
            .isLength({max:100}).withMessage("max 100 characters"),
        body('title')
            .trim()
            .isLength({max:100}).withMessage("max 100 characters"),
        body('genre')
            .trim()
            .isLength({max:100}).withMessage("max 100 characters"),
    ]
}

module.exports = {
    signUpValidation,
    signInValidation,
    songUploadValidation,
}