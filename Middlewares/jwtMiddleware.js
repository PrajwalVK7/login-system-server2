const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    const token = req.headers['authorization'].split(' ')[1]

    try{
        const jwtResponse = jwt.verify(token,process.env.SECRET_KEY);
        req.payload = jwtResponse.userID;
        next()
    }
    catch(err){
        console.log(err)
       res.status(401).json("Auothorization Failed, Please Login")
    }

}

module.exports = jwtMiddleware;