import express from 'express'
import ChatModel from '../models/ChatModel.js'

const ChatRouter = express.Router()


ChatRouter.post("/send" , (req,res)=>{
    const Chat = new ChatModel(req.body)
   // console.log(req.body)
    Chat.save().then((result)=>{
        res.send(result)
    }).catch((e)=>{
        res.send(e.message)
    })
})

ChatRouter.post('/' , async (req, res )=>{
    const result = await  ChatModel.find({$or: [ {$and:[{sender:req.body.sender },{reciever: req.body.reciever}]} ,  {$and:[{sender: req.body.reciever },{reciever: req.body.sender}]}    ]})
    //console.log(req.body)
    res.send(result)
})


ChatRouter.post('/mark' , async (req, res )=>{
    const result = await  ChatModel.find({$or: [ {$and:[{sender:req.body.sender },{reciever: req.body.reciever}]} ,  {$and:[{sender: req.body.reciever },{reciever: req.body.sender}]}    ]})
    for(var i in result){
        if(req.body.sender === result[i].reciever){
            result[i].isRead = true;
        }
        await ChatModel.findByIdAndUpdate(result[i]._id , result[i])
    }

    
    res.send(result)
})
export default ChatRouter