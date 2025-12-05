//middleware.auth.middleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (requiredRole=null){
    return (req, res , next)=>{
        try{
            const authHeader = req.header['authorization'];
            if(!authHeader) return res.status(401).json({message:'No token povided'});

            const token = authHeader.split(' ')[1]; //Bearer <token>
            if(!token) return res.status(401).json({message:'Malformed token'});

            const decoded = jwt.verify(token , process.env.JWT_SECRET);
            req.user={ id:decoded.id , role: decoded.role};

            if( requiredRole && decoded.role !== requiredRole){
                return res.status(403).json({message:'Forbidden : insufficient rights'});
            }

            next();
        }
        catch(err){
            console.error('Auth error:' , err.message);
            return res.status(401).json({message : ' Invalid or expired token'});            
        }
    };
};