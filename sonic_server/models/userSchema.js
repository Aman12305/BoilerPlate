import mongoose,{Schema} from 'mongoose'

const userSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        unique:true,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    profileImgUrl:{
        type:String,
    },
    joinedOn:{
        type:Date,
        default:Date.now()
    }
})

export default mongoose.model('User',userSchema)