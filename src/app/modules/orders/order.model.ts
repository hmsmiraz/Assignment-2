import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const OrderSchema = new Schema<TOrder>({
  email: { type: 'string', required: true },
  productId: { type: 'string', required: true },
  price: { type: 'number', required: true },
  quantity: { type: 'number', required: true },
});

export const OrderModel = model<TOrder>("Order", OrderSchema);