import user from "../models/user"

export const checkUsernameAndEmail = async (req, res, next) => {
    const {username, email} = req.body;
            /* Username validation */
    const userExist = await user.findOne({username});
    
    if(userExist){
        return res.status(400).json({message: "Username already exist"});
    }
            /* Email validation */
    const emailExist = await user.findOne({email});

    if(emailExist){
        return res.status(400).json({message: "Email already exist"});
    }

    next();
}