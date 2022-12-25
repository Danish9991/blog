import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

export const protect = async(req, res, next) => {
    try {
        if(req.headers.authorization){
            const token = req.headers.authorization.split(" ")[1]
            const customToken = token.length < 500;
            let decodedData;
            if(token && customToken){
                decodedData =  jwt.verify(token, process.env.JWT_SECRET);
                req.user = await userModel.findOne(decodedData.token)
            } else {
                decodedData = jwt.decode(token);
                const googleId = decodedData.sub.toString();
                req.user = await userModel.findOne({googleId})
            }
            next();
        }
        
    } catch (error) {
        console.log(error)
    }
}