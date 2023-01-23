const middlewareValidateJWT = (req, res, next) => {
    const jwt = req.headers["authorization"] || req.body.app_token;
    //console.log("Token => ", { header: req.headers["authorization"], body: req.body.app_token })
    // Efetuando a validação do JWT:
    const jwtService = require("jsonwebtoken");
    jwtService.verify(jwt, process.env.SECRET, (err, userInfo) => {
        if (err) {
            res.status(403).end();
            return;
        }

        req.user = userInfo;
        next();
    });
};

module.exports = middlewareValidateJWT;