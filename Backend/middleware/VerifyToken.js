import jwt from "jsonwebtoken";

export const VerifyToken = async(req, res, next) => {
    const authHeader = req.headers['authorization']; // Get the authorization header
    console.log('ini authHeader:', authHeader);
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the header
    console.log('ini token:', token);

    if (token == null) return res.sendStatus(401); // If no token is provided, return 401 Unauthorized
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => { // Verify the token
        if (err) return res.sendStatus(403); // If token verification fails, return 403 Forbidden
        req.userId = decoded.userId; // Attach the decoded user ID to the request object = decoded.email; // Attach the decoded user information to the request object
        console.log('ini decoded:', decoded);
        next(); // Call the next middleware or route handler
    });
};