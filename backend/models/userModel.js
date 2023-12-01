const mongoose= require('mongoose');

const userSchema= mongoose.Schema({
     userName:{
        type: String,
        trim: true,
        maxlength:25,
        required:true,
     },
     fullname:{
        type:String,
        trim:true,
        required:true,
        maxlength:25,
     },
     email:{
        type:String,
        trim:true,
        required:true,
        unique: true,
     },
     password:{
        type:String,
        required:true,
     },
     address:{
        type:String,
        default:'',
     },
     genero:{
        type:String,
        required: true,
     },
     website:{
        type:String,
        default:'',  
     },
     phone:{
        type:String,
        default:'',
     },
     avatar:{
      type: String,
      default:'',
     },
     story:{
       type:String,
       default:'',
       maxlength:200,
     },
     friends:[{type:mongoose.Types.ObjectId, ref:'users'}],
     following:[{type:mongoose.Types.ObjectId, ref:'users'}]
},{
    timestamps:true,
})
 module.exports=mongoose.model('users', userSchema
 )