import { Schema, model } from 'mongoose';
import {
  ProductModel,
  TInventory,
  TProduct,
  TVariant,
} from './product.interface';

const variantSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});
const productSchema = new Schema<TProduct, ProductModel>({
  id: { type: String, required: [true, 'Id is required and should be unique'], unique: true },
  name: { type: String, required: [true, 'Name is required and should be unique'], unique: true },
  description: {type: String, required: [true, 'Description is required'] },
  price: {type: number, required: [true, 'Price is required'] },
  category: {type: String, required: [true, 'Category is required'] },
  tags: { type: [String], required: [true, 'Tags are required'] },
  variants: { type: [variantSchema], required: [true, 'Variants are required'] },
  inventory: { type: inventorySchema, required: [true, 'Inventory details are required'] }
});

export const Product = model<TProduct, ProductModel>('Product', productSchema);
