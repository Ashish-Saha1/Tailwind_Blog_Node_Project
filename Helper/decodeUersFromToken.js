
const jwt = require('jsonwebtoken');


const decodeUersFromToken = async(req,res,next)=>{

    try {
        const token = req.cookies.token;
        if(token){
        const decode =  jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decode.user;
        
        } else{
            req.user = null;
        }
    } catch (error) {
        req.user = null;
    }

    next()

}


module.exports = decodeUersFromToken;