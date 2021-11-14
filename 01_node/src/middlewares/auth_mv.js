const {verifyToken} = require('../config/auth');

module.exports = (...roles) => {
    return (req, resp, next) => {
        let token = "";

        // seesion veya header da token yok ise unauthorized
        // var ise token jwt verify
        if(req.session.token || req.headers["authorization"]) {           

            // token assign
            if(req.session.token) {
                token = req.session.token;
            } else {
                token = req.headers["authorization"];
            }

            // token user scrape
            let decode = verifyToken(token);

            if (decode) {
                // if role required
                if(roles.length > 0) {
                    if(decode.role && roles.includes(decode.role)) {
                        next();
                    } else {
                        resp.status(401).send("unauthorized");
                    }
                } else {
                    next();
                }
            } else {
                resp.status(401).send("unauthorized");
            }

        } else {
            resp.status(401).send("unauthorized");
        }

    }
}
