import express from 'express';
import { getAllProducts,getOneProduct,createProduct,deleteOneProduct,updateOneProduct } from '../controllers/productsController.js';
import { runValidation } from '../validator/index.js';
import { CreatProducsValidation, productIdValidation, updateProducsValidation } from '../validator/productsvalidator.js';

const router = express.Router();

router.get('/',getAllProducts);
router.get('/:id',productIdValidation,runValidation, getOneProduct);
router.post('/',CreatProducsValidation,runValidation, createProduct);
router.delete('/:id', productIdValidation, runValidation, deleteOneProduct)
router.put('/:id', productIdValidation,updateProducsValidation, runValidation,updateOneProduct);
export default router;