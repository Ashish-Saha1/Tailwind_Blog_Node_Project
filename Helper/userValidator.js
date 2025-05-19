
const {check, validationResult} = require('express-validator');

const user = require('../Server/Model/user');


const registerValidator = [
    check('name')
        .isAlpha().withMessage('Use later only')
        .notEmpty().withMessage("Name is empty")
        .isLength({min:5}).withMessage('Name must be at least 5 characters long')
        .trim(),

    check('username')
        .isAlpha().withMessage('Use later only')
        .notEmpty().withMessage("Username is empty")
        .isLength({min:5}).withMessage('Name must be at least 5 characters long')
        .trim(),

    check('email')
        .isEmail().withMessage('Must be a valid email')
        .notEmpty().withMessage("Email is empty")
        .trim(),

    check('phone')
        .notEmpty().withMessage("Phone is empty")
        .isMobilePhone('bn-BD').withMessage('Enter a valid Phone number')
        .trim(),

    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .trim(),
]



const registerValidationResult = (req,res,next)=>{
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();


    if(Object.keys(mappedErrors).length === 0){
        next()
    }else{
        
        res.status(500).json(
            {
                errors : mappedErrors
            }
        )
    
    }
}




module.exports = {
    registerValidator,
    registerValidationResult
}