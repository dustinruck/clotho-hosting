/*

User controller for non-admin users
TODO: username regex

*/

const { User } = require("../models");
const { Listing } = require("../models");
const { ListingImage } = require("../models");
const { Category } = require("../models");
const { Size } = require("../models");
const { Gender } = require("../models");

const validator = require('validator');
const bcrypt = require('bcrypt');
const unameRegex = /^[a-zA-Z0-9]([_-]|[a-zA-Z0-9]){1,18}[a-zA-Z0-9]$/;
/* 
Get user by id (private profile view for logged in user) 
*/
exports.findById = async (req, res) => {

    try {

        var user = await User.findOne(
            {
                where: {
                    id:   req.userId,
                    isDeleted: false
                },
                attributes: ['username', 'email', 'avatar'],
                include: [
                    {
                        model: Listing,
                        as: 'listings',
                        required: false,
                        where: {
                            isDeleted: false
                        },
                        attributes: ['id', 'title', 'description', 'thumbnail', 'price', 'isSold', 'createdAt']
                    }
                ]
            }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // format decimal
        for (let i in user.listings) {
            user.listings[i].price /= 100;
            user.listings[i].price = user.listings[i].price.toFixed(2);
            console.log(user.listings[i].price);
        }
        const result = {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            },
            listings: user.listings
        }
        res.json(result);

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Get user by username (public profile view with listings)
*/
exports.findByUsernamePublic = async (req, res) => {

    try {

        var user = await User.findOne(
            {
                where: {
                    username: req.params.username,
                    isDeleted: false
                },
                attributes: ['id', 'username', 'avatar'],
                include: [
                    {
                        model: Listing,
                        as: 'listings',
                        required: false,
                        where: {

                            isDeleted: false
                        },
                        order: [['isSold', 'ASC']],
                        attributes: ['id', 'title', 'description', 'thumbnail', 'price', 'isSold', 'createdAt'],
                        include: [
                            {
                                model: Category,
                                attributes: ['name', 'id']
                            },
                            {
                                model: Size,
                                attributes: ['name', 'id']
                            },
                            {
                                model: Gender,
                                attributes: ['name', 'id']
                            }]
                    }]
            }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // format decimal
        for (let i in user.listings) {
            user.listings[i].price /= 100;
            user.listings[i].price = user.listings[i].price.toFixed(2);
            console.log(user.listings[i].price);
        }
        const result = {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            },
            listings: user.listings
        }
        res.json(result);

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Regiser new user
*/
exports.create = async (req, res) => {

    if (isValidPost(req, res)) {

        try {

            // username cannot already exist
            var user = await User.findOne({
                where: {
                    username: req.body.username
                }
            });

            if (user) {
                return res.status(400).json({ message: "Account with this username already exists" });
            }

            // email cannot already exist
            var user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (user) {
                return res.status(400).json({ message: "Account with this email already exists" });
            }

            //save new user
            bcrypt.hash(req.body.password, 10).then(async (hash) => {

                var user = await User.create({
                    username: req.body.username,
                    password: hash,
                    email: req.body.email,
                    avatar: '7e117ea59b13abf41bb4c655474b229ea44d18597f9ab4c1bad12b9eb420d909'
                });

                res.status(201).json({ message: "Successfully added user", user: { id: user.id, username: user.username, email: user.email } });
            });

        } catch (err) {

            console.log(err.message);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
};

/* 
Edit user profile (username, email, password, img)
*/
exports.updateById = async (req, res) => {

    if (isValidPut(req, res)) {

        try {
            // check that id exists and user is logged in
            var user = await User.findByPk(req.userId);

            if (!user) {
                return res.status(400).json({ message: "Invalid user id" });
            }

            // check availability of username if submitted
            if (req.body.username) {

                if (req.body.username == user.username) {
                    return res.status(400).json({ message: "New username cannot be the same as current username. Enter new username or leave blank" });
                }

                var usernameUser = await User.findOne({
                    where: {
                        username: req.body.username
                    }
                });

                if (usernameUser) {
                    return res.status(400).json({ message: "User with this username already exists" });
                }
            }

            // check availability of email if submitted
            if (req.body.email) {

                var userEmail = await User.findOne({
                    where: {
                        email: req.body.email
                    }
                });

                if (userEmail) {
                    return res.status(400).json({ message: "Account with this email already exists" });
                }
            }

            var password = user.password;

            if (req.body.password) {

                var match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    return res.status(400).json({ message: "New password cannot be the same as current password" });
                }
                password = await bcrypt.hash(req.body.password, 10);
            }
            userEdit = await User.update(
                {
                    username: req.body.username ? req.body.username : user.username,
                    email: req.body.email ? req.body.email : user.email,
                    password: password,
                    avatar: req.body.avatar ? req.body.avatar : user.avatar
                },
                {
                    where: {
                        id: req.userId
                    }
                });

            user = await User.findByPk(
                req.userId,
                {
                    attributes: ['id', 'username', 'email', 'avatar']
                }
            );

            res.status(200).json({ message: "Successful update", user: user });

        } catch (err) {

            console.log(err.message);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
};

/*
Update user password (no route yet, may be useful later for reset password with email)
*/
exports.updatePasswordById = async (req, res) => {

    if (!req.body.password) {
        return res.status(400).json({ message: "New password required" });
    }

    try {
        // check that id exists and user is logged in
        var user = await User.findByPk(req.userId);

        if (!user) {
            return res.status(400).json({ message: "Invalid user id" });
        }

        //save new password
        bcrypt.hash(req.body.password, 10).then(async (hash) => {

            var user = await User.update({
                password: hash
            },
                {
                    where: {
                        id: req.userId
                    }
                });

        });

        user = await User.findByPk(
            req.userId,
            {
                attributes: ['id', 'username', 'email', 'avatar']
            }
        );

        res.status(200).json({ message: "Successful update", user: user });

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Delete user by id
*/
exports.deleteById = async (req, res) => {

    try {

        // check that user with id exists
        var user = await User.findOne(
            {
                where: {
                    id: req.userId,
                    isDeleted: false
                }
            });

        if (!user) {
            return res.status(400).json({ message: "User does not exist or is already deleted" });
        }

        user = await User.update(
            {
                isDeleted: true
            },
            {
                where: {
                    id: req.userId
                }
            });

        res.status(200).json({ message: "Successfully closed account" });

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Reactivate account
May not be implemented, user would need to login first
*/
exports.unDeleteById = async (req, res) => {

    // request must include id
    if (!req.userId) {
        return res.status(400).json({ message: "User id cannot be null" });
    }
    try {

        // check that user with id exists
        var user = await User.findOne(
            {
                where: {
                    id: req.userId,
                    isDeleted: true
                }
            });

        if (!user) {
            return res.status(400).json({ message: "Invalid user id" });
        }

        user = await User.update(
            {
                isDeleted: false
            },
            {
                where: {
                    id: req.userId
                }
            });

        var user = await User.findByPk(
            req.userId,
            {
                attributes: ['id', 'username', 'email', 'avatar']
            }
        );

        res.status(200).json({ message: "Successful un-delete", user: user });

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

function isValidPost(req, res) {

    switch (true) {
        case (!req.body.username):
            res.status(400).json({ message: "Username cannot be null" });
            return false;
        case (!req.body.username.match(unameRegex)):
            res.status(400).json({ message: "Username must be 3-20 characters, be composed of only letters, numbers, underscore and hyphen. Must start and end with letter or number." });
            return false;
        case (!req.body.email):
            res.status(400).json({ message: "Email cannot be null" });
            return false;
        case (req.body.email.length > 360):
            res.status(400).json({ message: "Email cannot exceed 360 characters" });
            return false;
        case (!validator.isEmail(req.body.email)):
            res.status(400).json({ message: "Invalid email" });
            return false;
        case (!req.body.password):
            res.status(400).json({ message: "Password cannot be null" });
            return false;
        case (!validator.isStrongPassword(req.body.password)):
            res.status(400).json({ message: "Password must be 8 or more characters, including at least one uppercase letter, one lowercase letter, one number and one symbol." });
            return false;
        default:
            return true;
    }
}

function isValidPut(req, res) {
    switch (true) {
        case (req.body.username && !req.body.username.match(unameRegex)): //TODO regex
        res.status(400).json({ message: "Username must be 3-20 characters, be composed of only letters, numbers, underscore and hyphen. Must start and end with letter or number." });
        return false;
        case (req.body.email && req.body.email.length > 360):
            res.status(400).json({ message: "Email cannot exceed 360 characters" });
            return false;
        case (req.body.email && !validator.isEmail(req.body.email)):
            res.status(400).json({ message: "Invalid email" });
            return false;
        case (req.body.password && !validator.isStrongPassword(req.body.password)):
            res.status(400).json({ message: "Password must be 8 or more characters, including at least one uppercase letter, one lowercase letter, one number and one symbol." });
            return false;
        case (req.body.avatar && req.body.avatar.length > 200): //TODO imgs
            res.status(400).json({ message: "Path to avatar image cannot exceed 200 characters" });
            return false;
        default:
            return true;
    }
}
