import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signUp = async(req, res) => {
    const {email, password, firstName, lastName} = req.body;

    const userExists = await userModel.findOne({email})

    if(userExists) return res.status(404).json({ message : 'user already exist with this email'});

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await userModel.create({
        name : `${firstName} ${lastName}`,
        email,
        password : hashedPassword
    })

    const token = jwt.sign({email, id : user._id}, 
        process.env.JWT_SECRET, 
        {expiresIn : '1h'}
    )
    res.status(201).json({
        name : user.name,
        id : user._id,
        email,
        token
    })
}

export const signIn = async (req, res) => {
    const { email, password} = req.body;
     
   const userExists = await userModel.findOne({email})

   if(!userExists) return res.status(404).json({ message : 'invalid credentails'})

   const isPasswordMatched = await bcrypt.compare(password, userExists.password)

   if(!isPasswordMatched) return res.status(404).json({ message : 'invalid credentails'})

   if(isPasswordMatched) {
      const token = jwt.sign(
        {
            email: userExists.email,
            id : userExists._id}, process.env.JWT_SECRET, {
            expiresIn : '1h'
      })
      res.status(200).json({
        name : userExists.name,
        id : userExists._id,
        email,
        token
      })
   }

}

export const googleSignIn = async(req, res) => {
    const {email, name, googleId, token} = req.body
    
    const userExist = await userModel.findOne({email})
    if(userExist) {
       return res.status(200).json({
            id : userExist._id.toString(),
            email,
            name,
            token
        })
    }

    const user = await userModel.create({
        name,
        email,
        googleId
    })

    res.status(201).json({
      name,
      id : user.id,
      email,
      googleId,
      token
    })
}