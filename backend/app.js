import express from "express";
import cors from 'cors'
import Users from './routes/user.js'
import Chat from './routes/chat.js'
import mongoose from "mongoose";

const app = express()
app.use(cors())
app.use(express.json())

app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/chatapp' , ()=>{
    console.log("Connection Established")
})

app.use("/users" , Users)
app.use("/chat" , Chat)




app.listen(5000);