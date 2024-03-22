const { body, validationResult } = require("express-validator");

const validateInputMiddleware = [
    (req, res, next) => {
        req.body.username = req.body.username.replace(/\s/g, '').trim();
        console.log("Trimmed username:", req.body.username);
        next();
    },
    body('username').isLength({ min: 4 }).withMessage('Username must be minimum 4 characters long'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage('Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }
        next();
    }
];

module.exports = validateInputMiddleware;
