import { z } from 'zod';

// Define the Variant Zod schema
const variantValidationSchema = z.object({
  type: z.string().nonempty('Type is required'),
  value: z.string().nonempty('Value is required'),
});

// Define the Inventory Zod schema
const inventoryValidationSchema = z.object({
  quantity: z.number().int().nonnegative('Quantity must be a non-negative integer'),
  inStock: z.boolean(),
});

// Define the Product Zod schema
const productValidationSchema = z.object({
  id: z.string().nonempty('Id is required and should be unique'),
  name: z.string().nonempty('Name is required and should be unique'),
  description: z.string().nonempty('Description is required'),
  price: z.number().positive('Price must be a positive number'),
  category: z.string().nonempty('Category is required'),
  tags: z.array(z.string().nonempty()).nonempty('Tags are required'),
  variants: z.array(variantValidationSchema).nonempty('Variants are required'),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
