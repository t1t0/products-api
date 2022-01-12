import {Schema, model} from 'mongoose'

export const ROLES = ["user", "moderator", "admin"]

const roleSchema = new Schema({
    name:{
        type:String
    }
},{
    versionKey: false,
    timestamps: true
})

export default model('Role', roleSchema)