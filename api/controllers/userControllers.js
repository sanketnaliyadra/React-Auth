import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req,res) => {
    res.json({
        message: "Api is working"
    });
};

export const updateUser = async(req, res, next) => {
    console.log("Hey",req.user)
    if(req.user.id !== req.params.id){
        return next(errorHandler(401,'You can only update your account'))
    }
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10);
        }
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture
                }
            },
            {new: true}
        );
        console.log("updated",updateUser)
        const {password, ...rest} = updateUser._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error);
    }
}