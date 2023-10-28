import jwt from 'jsonwebtoken';

const secreatKey = process.env.JWT_SECRET_KEY || "fr678tfvfrtyytfvyyg98uyg9876tgw";

const verifyToken = (req,res,next) => {
    try {
        
        const token = req.cookies.accessToken;

        if(!token){
            return res.status(401).json({
                success : false,
                message : "No JWT Token Found. Please Login To Create A New JWt Token"
            })
        };

        jwt.verify(token,secreatKey,(err,user) => {
            if(err){
                return res.status(400).json({
                    success:false,
                    message:"Invalid JWT Token",
                    error: err
                })
            }
            req.user = user;
            next();
        })

    } catch (error) {
        console.log("Failed to Verify The jwt Token : ",error);
        res.status(401).send({auth:false, message:"Failed to authenticate token."});
    }
};

export const verifyUser = (req,res,next) => {
    verifyToken(req,res,next,() => {
        if(req.user.id === req.params.id || req.user.role === 'admin'){
            next()
        } else{
            return res.status(400).json({
                success : false,
                message : "You are not authorized to perform this action"
            })
        }
    })
};

export const verifyAdmin = (req,res,next) => {
    verifyToken(req,res,next,() => {
        if(req.user.role === 'admin'){
            next()
        } else{
            return res.status(400).json({
                success : false,
                message : "You are not authorized to perform this action"
            })
        }
    })
};