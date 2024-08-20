const mongoose = require('mongoose');

const dotenv=require('dotenv')
dotenv.config({})


const ConnectDb=async ()=>{
    try{
        const conn=await mongoose.connect(process.env.db_string,
        {useUnifiedTopology:true})
       
        console.log("connected to the mongoDB ajju")
   

    }
    catch(error){
        console.log(error)
        console.log("not connected")
    }
  }

module.exports=ConnectDb