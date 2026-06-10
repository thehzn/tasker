const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"name is required"],
            trim:true,
        },
        
        email:{
            type:String,
            required:[true,"email is required"],
            unique:true,
            trim:true,
        },
        age:{
            type:Number,
            required:[true,"age is required"],
            trim:true,
        },
        password:{
            type:String,
            required:[true,"password is required"],
            minlength:6,
            select:false,
        },
        role:{
            type:String,
            enum:["user","admin"],
            default:"user",

        },
       
       
//     resume: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'Resume',
//   default: null
// },
    
    },
    {timestamps:true}
);

// userSchema.pre("save",async function(){
//     if(!this.isModified("password")) return
//     this.password  = await bcrypt.hash(this.password,12);
// });
userSchema.pre("save", async function () {
    // 1. If the password wasn't modified or doesn't exist, just return to stop execution
    if (!this.isModified("password") || !this.password) return;

    try {
        // 2. Safely parse your salt rounds to a number
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUND, 10) || 12;
        
        // 3. Hash the password
        this.password = await bcrypt.hash(this.password, saltRounds);
        
        // No 'next()' here! Just let the async function finish naturally.
    } catch (error) {
        // Throwing the error inside an async hook tells Mongoose to abort the save
        throw error; 
    }
});

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
};

module.exports = mongoose.model("User",userSchema);

