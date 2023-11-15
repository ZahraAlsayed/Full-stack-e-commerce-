
import { check } from "express-validator";

export const productIdValidation = [
    check('id').isNumeric().withMessage('product ID must be number'),
];

export const CreatProducsValidation = [
    check('name')
    .trim().notEmpty().withMessage('product name required')
    .isLength({ min: 3, max: 300 })
    .withMessage('product name must be at least 3-200 chraractrs'),
    check('price')
        .trim().notEmpty().withMessage('proce is required')
    .isFloat({min:1}).withMessage('price must be positev number')
];
export const updateProducsValidation = [
    check('name')
    .optional()
    .trim().notEmpty().withMessage('product name required')
    .isLength({ min: 3, max: 300 })
    .withMessage('product name must be at least 3-200 chraractrs'),
    check('price')
    .optional()
    .trim().notEmpty().withMessage('proce is required')
    .isFloat({min:1}).withMessage('price must be positev number')
];