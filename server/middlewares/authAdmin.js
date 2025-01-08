import jwt from 'jsonwebtoken';

// Admin Authentication Middleware
const authAdmin = async (req, res, next) => {
    try {
        
        // Check if token is provided
        const {atoken} = req.headers;
        if (!atoken) {
            return res.status(401).json({success:'false', message: "Access Denied, Token Required" });
        }
        // Verify token
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
        // Check if token is valid
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({success:'false', message: "Invalid Token" });
        }

        
        next(); 


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
        
    }
};

export default authAdmin;