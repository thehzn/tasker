const mongoose = require("mongoose");

const databaseConnection = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected");

    }
    catch(error){
        console.log("mongoose connection error",error);
        process.exit(1);
    }
}
module.exports=databaseConnection;