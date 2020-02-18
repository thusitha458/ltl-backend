const jwt = require('jsonwebtoken');
const {AUTH_COOKIE_NAME, JWT_SECRET, userRoles, AUTH_HEADER_NAME} = require('../config/config');

module.exports.authenticate = (roles = []) => (req, res, next) => {
    try {
        let authCookie = req.cookies && req.cookies[AUTH_COOKIE_NAME];
        let authHeader = req.headers && req.headers[AUTH_HEADER_NAME];
        if (authCookie || authHeader) {
            try {
                let userData = jwt.verify(authCookie ? authCookie : authHeader, JWT_SECRET);
                if (userData && userData.data && userData.data.role
                    && (roles.findIndex(role => role === userData.data.role) !== -1
                        || roles.findIndex(role => role === userRoles.ANY) !== -1)) {
                    req.user = userData.data;
                    next();
                } else {
                    res.status(401).json({error: 'Unauthorized'});
                }
            } catch (error) {
                res.status(401).json({error: 'Unauthorized'});
            }
        } else {
            res.status(401).json({error: 'Unauthorized'});
        }
    } catch (error) {
        res.status(500).json({error: 'Internal Server error'});
    }
};