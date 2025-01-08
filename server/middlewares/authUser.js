import jwt from 'jsonwebtoken';

// User Authentication Middleware
const authUser = async (req, res, next) => {
    try {
        
        // Check if token is provided
        const {token} = req.headers;
        if (!token) {
            return res.status(401).json({success:'false', message: "Access Denied, Token Required" });
        }
        // Verify token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next(); 


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
        
    }
};

export default authUser;