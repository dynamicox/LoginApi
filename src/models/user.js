import {Schema, model} from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }] 
},{
    timestamps: true,
    versionKey: false
})

userSchema.statics.encryptPass = async (password) =>{
  return await bcrypt.hash(password, 10);
}

userSchema.statics.comparePass = async (password, recievedPass) =>{
    return await bcrypt.compare(recievedPass, password);
}

export default model("User", userSchema);