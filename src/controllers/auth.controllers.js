import User from "../models/user.js";
import Role from "../models/role.js";
import jwt from "jsonwebtoken";
import config from "../config";

export const signUp = async (req, res) => {
    const {username, email, password, role} = req.body;

    const newUser = new User({
        username,
        email,
        password: await User.encryptPass(password)
    })

        if(role){
           const roles = await Role.find({name: {$in: role}})
           newUser.role = roles.map(rol => rol._id);
        }else{
            const role = await Role.findOne({name: 'user'})
            newUser.role = [role._id];
        }

    const savedUser = await newUser.save()
        console.log(savedUser);
    const token = jwt.sign({id: savedUser._id}, config.SECRET, {expiresIn:86400});
    res.status(200).json({token});
}

export const signIn = async (req, res) => {
    const {email, password} = req.body;
    
    const userExist =  (await User.findOne({email})).populate("role")

    if(!userExist){
      return res.status(400).json({message: 'Este correo no esta registrado'});
    }

    const authenticated = await User.comparePass(userExist.password, password);

    if(!authenticated){
        return res.status(401).json({message:"Contraseña incorrecta"});
    }

    const token = jwt.sign({id: userExist._id}, config.SECRET, {expiresIn:86400});
    res.status(200).json({token, message: "Bienvenido"});
}