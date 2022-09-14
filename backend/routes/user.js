import express from 'express'
import multer from 'multer'
import UserModel from '../models/UserModel.js'


const Router = express.Router()


const storage = multer.diskStorage({
    destination : (req,file , cb)=>{
        cb(null ,'public/images')
    },
    filename : (req , file , cb)=>{
        cb(null , 'file--'+Date.now()+"-"+file.originalname)
    }
})

const upload = multer({storage:storage})

Router.post('/register' ,upload.single('photo') ,(req,res)=>{

    const check = UserModel.find({email : req.body.email})
    if(check > 0){
        res.status(201).send({error: "User Already Exists"})
    }else{
    const User =new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        photo:req.file.filename,
    })
    User.save().then((result)=>{
        res.send(result)
    }).catch((e)=>{
        res.send(e.message)
    })
}
    
})


Router.post('/check' , async (req,res)=>{
   // console.log(req.body.email)
    const check = await UserModel.findById(req.body.id)
    res.send(check)
})

Router.post('/login' , async (req,res)=>{
    
    const check = await UserModel.find({email : req.body.email , password : req.body.password})
    if(check.length > 0){
    check[0].isOnline = true;
    const data = await UserModel.findByIdAndUpdate(check[0]._id , check[0] )
    //console.log(data)
    res.status(200).send(check)
    }else{
        res.status(201).send({error: 'User Not Found'})
    }
})

Router.post('/logout' , async (req,res)=>{
    const data = await UserModel.findById(req.body.id)
    
    data.isOnline = false;
    await UserModel.findByIdAndUpdate(req.body.id , data)
    res.send("Updated")
})




Router.get('/' ,async (req,res)=>{
    const data = await UserModel.find({})
    res.send(data)
})

export default Router