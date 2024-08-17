const jwt = require('jsonwebtoken');

//  Middleware to authenticate the user using JWT
function authUser(req,res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

   // check if auth token is included in headers
    if (token == null) {
        return res.status(401).json({message : "token required"})
    }

    // check if the auth-token is valid 

    jwt.verify(token,process.env.JWT_SECRETKEY,async (err,user) => {
        if(err) return res.status(403).json({message:"invalid token"});
        
      // to check what is inside user which jwt.verify returns
        console.log(user)

        req.user = user;
        next();
    });
    
}

module.exports = {
    authUser
}