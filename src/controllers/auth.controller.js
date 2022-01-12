import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role'

export const singUp = async (req, res) => {
    const {username, email, password, roles} = req.body

    try {
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password)
        })

        
        const role = await Role.findOne({name: 'user'})
        newUser.roles = [role._id]

        const savedUser = await newUser.save()

        const token = jwt.sign({id: savedUser._id}, config.SECRET, {
            expiresIn: 86400
        }) 
        res.status(200).json({token})
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

export const singIn = async (req, res) => {
    const userFound = await User.findOne({email: req.body.email}).populate("roles")

    if(!userFound) return res.status(400).json({message: 'Authentication failed: User not found', token: null})

    const matchPassword = await User.comparePasswords(req.body.password, userFound.password)

    if(!matchPassword) return res.status(401).json({message: 'Authentication failed: Invalid Password', token: null}) 

    //console.log(userFound)
    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400
    }) 
    res.json({token: token})
}