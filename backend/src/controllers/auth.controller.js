const jwt = require('jsonwebtoken');
const dbo = require('../../db/conn');

exports.post = async (req, res) => {

    const dbConnect = dbo.getDb();
    let user = await dbConnect
        .collection('users')
        .findOne({ login: req.body.login, password: req.body.password });
    if (user) {
        const token = jwt.sign(user, process.env.SECRET, {
            expiresIn: 86400 // expires in 24hours
        });
        delete user.password;
        res.status(200).json({ token, user});
    } else {
        res.status(403).send("User not found!");
    }
};

exports.postSSO = async (req, res, next) => {

    const dbConnect = dbo.getDb();
    let user = await dbConnect
        .collection('users')
        .findOne({ login: req.user.login, password: req.user.password });
    if (user) {
        const token = jwt.sign(user, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
        });
        //console.log("User =>", { token, user });
        delete user.password;
        res.status(200).json({ token, user });
    } else {
        res.status(403).send("User not found!");
    }
};

