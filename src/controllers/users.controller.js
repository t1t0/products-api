import jwt from 'jsonwebtoken'
import config from '../config'
import User from "../models/User"
import Role from "../models/Role"

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate("roles")

        res.json(users)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}

export const createUser = async (req, res) => {
    const {username, email, password, roles} = req.body

    try {
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password),
            roles
        })

        if(roles){
            const foundRoles = await Role.find({name: {$in: roles}})
            newUser.roles = foundRoles.map(role => role.id)
        }else{
            const role = await Role.findOne({name: 'user'})
            newUser.roles = [role._id]
        }

        const savedUser = await newUser.save()

        const token = jwt.sign({id: savedUser._id}, config.SECRET, {
            expiresIn: 86400
        }) 
        res.status(200).json({token})
    }catch(err){
        res.status(400).json({message: err.message})
    }
}