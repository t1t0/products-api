import { ROLES } from '../models/Role'
import User from '../models/User'

export const checkDuplicatedUsernameOrEmail = async (req, res, next) => {
    const user = await User.findOne({username: req.body.username})

    if(user) return res.status(400).json({message: 'The User already exists'})

    const email = await User.findOne({email: req.body.email})

    if(email) return res.status(400).json({message: 'Email is already in use'})

    next()
}

export const checkRolesExists = async (req, res, next) => {
    if(req.body.roles){
        for(let i in req.body.roles){
            if(!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({message: `Role ${req.body.roles[i]} does not exist`})
            }
        }
    }

    next()
}