
const {check, validationResult} = require('express-validator');

const user = require('../Server/Model/user');


const registerValidator = [
  check('name')
    .trim()
    .notEmpty().withMessage("Name is empty").bail()
    .isAlpha().withMessage('Use letters only').bail()
    .isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),

  check('username')
    .trim()
    .notEmpty().withMessage("Username is empty").bail()
    .isAlpha().withMessage('Use letters only').bail()
    .isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),

  check('email')
    .trim()
    .notEmpty().withMessage("Email is empty").bail()
    .isEmail().withMessage('Must be a valid email'),

  check('phone')
    .trim()
    .notEmpty().withMessage("Phone is empty").bail()
    .isMobilePhone('bn-BD').withMessage('Enter a valid Phone number'),

  check('password')
    .trim()
    .notEmpty().withMessage('Password is required').bail()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];


// const registerValidationResult = (req, res, next) => {
//     const errors = validationResult(req);
//     const mappedErrors = errors.mapped();

//     if (Object.keys(mappedErrors).length === 0) {
//         next();
//     } else {
//         res.status(400).json({ errors: mappedErrors });
//     }
// };


const registerValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        // Extract only field: msg
        const simplifiedErrors = {};
        for (let field in mappedErrors) {
            simplifiedErrors[field] = mappedErrors[field].msg;
        }

        res.status(400).json({ errors: simplifiedErrors });
    }
};

module.exports = {
    registerValidator,
    registerValidationResult
};







module.exports = {
    registerValidator,
    registerValidationResult
}





