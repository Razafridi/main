import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
    sender: {type: String , required: true},
    reciever: {type: String , required: true},
    msg: {type: String , required: true},
    isRead : {type : Boolean , default: false},
    date: {type: String ,default : new Date(), required: true},
})

const ChatModel = mongoose.model('Chat' , Schema)
export default ChatModel