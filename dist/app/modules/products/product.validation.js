"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Variants Validation
const VariantsValidation = zod_1.z.object({
    type: zod_1.z.string().min(1, 'Variant type is required'),
    value: zod_1.z.string().min(1, 'Variant value is required'),
});
// Inventory Validation
const InventoryValidation = zod_1.z.object({
    quantity: zod_1.z.number().min(1, 'Inventory quantity is required'),
    inStock: zod_1.z.boolean(),
});
// Product Validation
const ProductValidation = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Product name is required'),
    description: zod_1.z.string().min(1, 'Product description is required'),
    price: zod_1.z.number().min(1, 'Product price is required'),
    category: zod_1.z.string().min(1, 'Product category is required'),
    tags: zod_1.z.array(zod_1.z.string()).min(1, 'Product tags are required'),
    variants: zod_1.z.array(VariantsValidation).min(1, 'Product variants are required'),
    inventory: InventoryValidation,
});
exports.default = ProductValidation;
