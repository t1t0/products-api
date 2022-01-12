import {Router} from 'express'
const router = Router()

import * as productController from '../controllers/products.controller'
import { authJWT } from '../middlewares'

router.get('/', [authJWT.verifyToken], productController.getAllProducts)
router.post('/', [authJWT.verifyToken, authJWT.isModerator], productController.createProduct)
router.get('/:id', [authJWT.verifyToken], productController.getProductById)
router.patch('/:id', [authJWT.verifyToken, authJWT.isAdmin], productController.updateProductById)
router.delete('/:id', [authJWT.verifyToken, authJWT.isAdmin], productController.deleteProductById)


export default router