const mongoose=require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    task:{
        type:String,
        require:true
    },
    days:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model("Admin",AdminSchema);