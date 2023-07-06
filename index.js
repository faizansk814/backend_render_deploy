const express=require('express')
const connection = require('./connection/connection')
const bookrouter = require('./routes/book.router')
const cors=require('cors')
const app=express()
app.use(express.json())
app.use(cors())
app.use("/book",bookrouter)
app.listen(4031,async ()=>{
    try {
      await connection
      console.log("connected")  
    } catch (error) {
        
    }
    console.log("Server running on port 4031")
})