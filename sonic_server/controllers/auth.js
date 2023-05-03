import User from "../models/userSchema.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const generateJwt = async(email,id) =>{
    return jwt.sign({ email: email, id:id}, process.env.JWT_SECRET , { expiresIn: '8h'});
}

export const login = async(req,res) =>{
    const {email,password} = req.body

    const userEmail = email.toLowerCase();

    try{
        const userData = await User.findOne({email:userEmail});

        if(!userData){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, userData.password)
        if(!isPasswordCorrect){
            return res.status(400).json({
                success:false,
                message : "Invalid credentials",
                err:"Invalid credentials"})
        }

        const userJwt = await generateJwt(userData.email,userData._id);

        return res.status(200).json({
            success:true,
            message:"User Logged in sucessfully",
            data:userData,
            token:userJwt
        })


    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        })
    }
}

export const signin = async(req,res) =>{
    const {name,email,password} = req.body
    const userEmail = email.toLowerCase();

    try{

        const isUserExist = await User.findOne({email:userEmail});

        if(isUserExist){
            return res.status(200).json({
                success:false,
                message:"User Already Exist"
            })
        }

        
        const hashedPassword = await bcrypt.hash(password, 12)

        const userData = await User.create({
            name,
            email:userEmail,
            password:hashedPassword
        })

        const userJwt = await generateJwt(userData.email,userData._id);

        return res.status(200).json({
            success:true,
            message:"User Created sucessfully",
            data:userData,
            token:userJwt
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message
        })
    }
}