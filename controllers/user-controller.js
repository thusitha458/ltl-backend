const jwt = require('jsonwebtoken');
const userService = require('../services/user-service');
const {JWT_SECRET, AUTH_COOKIE_NAME, COOKIE_LIFETIME_MS} = require('../config/config');

module.exports.insertUser = async (req, res, next) => {
    try {
        let role = req.body.role;
        let password = req.body.password;

        let existingUser = await userService.getUser(role);
        if (existingUser) {
            res.status(400).json({error: 'User already exists'});
        } else {
            await userService.insertUser(role, password);
            res.json();
        }
    } catch(error) {
        res.status(500).json({error: 'Internal server error'});
    }
};

module.exports.login = async (req, res, next) => {
    try {
        let role = req.body.role;
        let password = req.body.password;

        let user = await userService.getUser(role);
        if (user && user.password === password) {
            let token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (COOKIE_LIFETIME_MS / 1000),
                data: {
                    role: role,
                    date: new Date().toISOString(),
                }
            }, JWT_SECRET);
            res.cookie(AUTH_COOKIE_NAME, token, {maxAge: COOKIE_LIFETIME_MS, httpOnly: true})
                .json({
                    user: user,
                    token: token,
                    tokenAgeMS: COOKIE_LIFETIME_MS,
                });
        } else {
            res.status(400).json({error: 'Invalid credentials'});
        }
    } catch(error) {
        res.status(500).json({error: 'Internal server error'});
    }
};

module.exports.updatePassword = async (req, res, next) => {
    try {
        let role = req.user.role;
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;

        if (role) {
            let user = await userService.getUser(role);
            if (user && user.password === oldPassword) {
                if (newPassword) {
                    await userService.updatePassword(role, newPassword);
                    res.json();
                } else {
                    res.status(400).json({error: 'New password should not be empty'});
                }
            } else {
                res.status(400).json({error: 'Invalid credentials'});
            }
        } else {
            res.status(401).json({error: 'Unauthorized'});
        }
    } catch(error) {
        res.status(500).json({error: 'Internal server error'});
    }
};

module.exports.updatePasswordForRole = async (req, res, next) => {
    try {
        let role = req.params.role;
        let password = req.body.password;

        if (role === req.user.role) {
            res.status(401).json({error: 'Unauthorized'});
        } else if (role) {
            let user = await userService.getUser(role);
            if (user) {
                if (password) {
                    await userService.updatePassword(role, password);
                    res.json();
                } else {
                    res.status(400).json({error: 'New password should not be empty'});
                }
            } else {
                res.status(400).json({error: 'User could not be found'});
            }
        } else {
            res.status(400).json({error: 'Role should not be empty'});
        }
    } catch(error) {
        res.status(500).json({error: 'Internal server error'});
    }
};