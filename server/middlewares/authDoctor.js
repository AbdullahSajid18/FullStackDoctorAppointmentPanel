import jwt from 'jsonwebtoken';

// Doctor Authentication Middleware
const authDoctor = async (req, res, next) => {
    try {
        
        // Check if token is provided
        const {dtoken} = req.headers;
        if (!dtoken) {
            return res.status(401).json({success:'false', message: "Access Denied, Token Required" });
        }
        // Verify token
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
        req.body.docId = token_decode.id;
        next(); 


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
        
    }
};

export default authDoctor;