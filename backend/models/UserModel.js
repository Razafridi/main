import mongoose from "mongoose";

const Schema = mongoose.Schema({
    name :{type : String , require: true ,},
    email :{type : String , require: true , unique: true},
    password :{type : String , require: true},
    photo :{type : String , require: true},
    isAdmin: {type: Boolean , default: false},
    isOnline : {type : Boolean ,default: false}
})

const UserModel = mongoose.model('Users' , Schema)

export default UserModel

