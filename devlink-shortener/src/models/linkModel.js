import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    userAgent: {
        type: String,
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    },
    referrer: {
        type: String
    }
});

const linkSchema=new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    originalUrl:{
        type:String,
        required:true
    },
    clicks:{
        type:Number,
        default:0
    },
    analytics:[analyticsSchema]
})

export default mongoose.model('Link', linkSchema);