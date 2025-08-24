import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const RefreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken; // Get the refresh token from cookies
        console.log('ini refresh token:', refreshToken);
        if (!refreshToken) return res.sendStatus(401); // If no refresh token is provided, return 401 Unauthorized
        const user = await Users.findOne({
            where: { refreshToken }
        });
        console.log('ini user dengan refresh token:', user);
        if(!user) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user.id;
            const username = user.username;
            const email = user.email;
            const accessToken = jwt.sign({userId, username, email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'});
            res.json({accessToken});
        });
        console.log('RefreshToken:', refreshToken);
    } catch (error) {
        console.error('Error in RefreshToken:', error.message);
        return res.sendStatus(500);
    };
};