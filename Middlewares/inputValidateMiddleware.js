const { body, validationResult } = require("express-validator");

const validateInputMiddleware = [
    (req, res, next) => {
        if (req.body.username) {
            req.body.username = req.body.username.replace(/\s/g, '').trim();
            console.log("Trimmed username:", req.body.username);
        }
        next();
    },
    body('username').custom((value, { req }) => {
        if (value) {
            if (value.length < 4) {
                throw new Error('Username must be minimum 4 characters long');
            }
        }
        return true; 
    }),
    body('password').custom((value, { req }) => {
        if (value) {
            if (value.length < 8) {
                throw new Error('Password must be at least 8 characters long');
            }
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value)) {
                throw new Error('Password must include at least one uppercase letter, one lowercase letter, one number, and one special character');
            }
        }
        return true; 
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }
        next();
    }
];

module.exports = validateInputMiddleware;
