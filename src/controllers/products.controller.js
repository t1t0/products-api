import Product from "../models/Product"

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()

        res.json(products)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}

export const createProduct = async (req, res) => {
    const product = new Product({...req.body})
    try {
        const newProduct = await product.save()
        res.status(200).json(newProduct)
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

export const getProductById = async (req, res) => {
    let product
    try{
        product = await Product.findById(req.params.id)
        if(product == null){
            return res.status(400).json({message: 'Cannot find Product'})
        }
    } catch(err){
        return res.status(500).json({message: err.message})
    }

    res.json(product)
}

export const updateProductById = async (req, res) => {
    let product
    try{
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(product == null){
            return res.status(400).json({message: 'Cannot find Product'})
        }
    } catch(err){
        return res.status(500).json({message: err.message})
    }

    res.json(product)
}

export const deleteProductById = async (req, res) => {
    try{
        await Product.findByIdAndRemove(req.params.id)
        res.json({ message: 'Subscriber Deleted!' })
    } catch(err){
        return res.status(500).json({message: err.message})
    }
}