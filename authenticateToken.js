import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from "cookie-parser";

export default function authenticate(req, res, next) {
    const token = req.cookies.token; // Retrieve the token from cookies
    

    if (!token) {
        return res.json({ error: "Please login" });
    }

    jwt.verify(token, process.env.secrret_key, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: "Token expired, please login again" });
            } else {
                
                return res.status(403).json({ error: "Invalid token, please login again" });
            }
        }
        req.user=user;


 next(); // Pass control to the next middleware or route handler
    });
}
