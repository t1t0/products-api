import {Schema, model} from 'mongoose'

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    imgURL: {
        type: String
    }
},{
    timestamps: true,
    versionKey: false
})

export default model('Product', productSchema)