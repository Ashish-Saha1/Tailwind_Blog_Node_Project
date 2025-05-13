
const jwt = require('jsonwebtoken');


const authGurd = async(req,res,next)=>{

    try {
        const token = req.cookies.token;
        if(token){
       const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decode;

        next()
        } else{
            res.send('Token not available in authGurd')
        }
    } catch (error) {
        next(error)
    }

}


module.exports = authGurd;