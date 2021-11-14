const {ResultModel} = require('../models/resultModel')

module.exports = (...types) => {
    return (req, resp, next) => {
        const song = req.file;
        const type = song.mimetype;
        if(types.includes(type)) {
            next();
        } else {
            const result = new ResultModel(false, `invalid type ${type}`, ["invalid type"]);
            resp.json(result);
            resp.end();
        }
    }
} 