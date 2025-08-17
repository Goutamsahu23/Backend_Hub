const mongoose=require('mongoose');

const noteSchema=mongoose.Schema({
    text:{
        type:string,
        required:true
    },
    boardId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Board',
        required:true
    },
    position:{
        x:{
            type:Number,
            default:0
        },
        y:{
            type:Number,
            default:0
        }
    },
    color:{
        type:String,
        default:'#FFD700'
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    timestamps:true
})

module.exports = mongoose.model('Note', noteSchema);