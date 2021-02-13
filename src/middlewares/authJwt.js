import jwt from "jsonwebtoken";
import config from "../config";
import user from "../models/user";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];

        if(!token){
            return res.status(403).json({message: "No token provided"});
        }

        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id

        const userExist = await user.findById(userId, {password:0});

        if(!userExist){
            return res.status(404).json({message: "User not found"});
        }

        next();
    } catch (error) {
        res.status(403).json({message: "Not allowed"});
    }
}

export const isModerator = async (req, res, next) => {

}

export const isAdmin = async (req, res, next) => {}