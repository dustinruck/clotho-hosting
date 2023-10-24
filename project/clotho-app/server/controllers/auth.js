/*
Auth functions for users and admins
*/

const { User } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/*
 Cache for tokens after logout
 */
var deadTokens = [];
var deadRefreshTokens = [];


/*
Login
Check credentials and send tokens
*/
exports.login = async (req, res) => {

    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: "required" });
    }

    try {

        User.findOne({ where: { username: req.body.username } }).then(user => {

            if (!user) {
                return res.status(400).json({ message: "Incorrect username and password combination" });
            }

            bcrypt.compare(req.body.password, user.password).then(async (match) => {

                if (!match) {
                    return res.status(400).json({ message: "Incorrect username and password combination" });
                }

                const token = signToken(user);
                const refreshToken = signRefresh(user);

                return res.json({ token: token, refreshToken: refreshToken, userId: user.id, isAdmin: user.isAdmin, username: user.username, avatar: user.avatar });
            });
        });

    } catch (err) {

        console.log(err.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

/*
Logout
Verify login, cache tokens
*/
exports.logout = (req, res) => {

    try {
        deadTokens.push(req.token);
        deadRefreshTokens.push(req.refreshToken);
        console.log("deadtokens " + deadTokens[0]);

        res.status(200).json("Successfully logged out");

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

/*
Retrieve logged in user id and role
*/
exports.getUser = (req, res, next) => {

    if (deadTokens.includes(req.token)) {

        return res.status(403).json("DEAD TOKEN");
    }

    jwt.verify(req.token, process.env.SECRET, (err, data) => {

        if (err) {

            console.log(err);
            return res.status(403).json("you are not logged in");

        } else {

            console.log('current user id : ' + data.user.id);
            req.userId = data.user.id;
            req.isAdmin = data.user.isAdmin;
            next();
        }
    })
};

/*
Authorize resources to admin only
*/
exports.adminOnly = (req, res, next) => {

    if (!req.isAdmin) {
        return res.status(404).json({ message: "Page not found" })
    }
    next();

};

/*
Retrieve current token
*/
exports.getToken = (req, res, next) => {

    const header = req.headers.authorization;

    if (header) {

        const reqToken = header.split(' ')[1];
        req.token = reqToken;

        next();

    } else {
        return res.status(401).json("CANNOT GET TOKEN you are not logged in");
    }
}


/*
Use refresh token
*/
exports.refreshToken = (req, res) => {

    const refreshToken = req.token;

    if (!refreshToken) {

        return res.status(401).json("NO TOKEN given for refresh");
    };

    if (deadRefreshTokens.includes(refreshToken)) {

        return res.status(403).json("dead refresh token");
    }

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, data) => {

        if (err) {
            return res.status(403).json("cannot verify refresh token");
        }

        const newToken = signToken(data.user);

        res.json({ token: newToken });

    });
}


/*
Sign user token
*/
function signToken(user) {
    return jwt.sign({ user }, process.env.SECRET, { expiresIn: '1h' });
}

/*
Sign refresh token
*/
function signRefresh(user) {
    return jwt.sign({ user }, process.env.REFRESH_SECRET, { expiresIn: '24h' });
}