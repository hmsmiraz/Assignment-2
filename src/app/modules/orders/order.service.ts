import { ProductModel } from '../products/product.model';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

export const createOrderService = async (order: TOrder) => {
  const id = order.productId;
  const isExists = await ProductModel.findById(id);
  if (!isExists) {
    throw new Error('Product not found in DB!');
  } else {
    const updatedQuantity = isExists?.inventory?.quantity - order?.quantity;
    if (
      isExists.inventory.inStock &&
      updatedQuantity >= 0 &&
      updatedQuantity <= isExists?.inventory?.quantity
    ) {
      const result = await OrderModel.create(order);
      await ProductModel.updateOne(
        { _id: id },
        {
          'inventory.quantity': updatedQuantity,
          'inventory.inStock': updatedQuantity > 0,
        },
      );
      return result;
    } else {
      throw new Error('Insufficient quantity available in inventory');
    }
  }
};
export const getOrderService = async (email: string) => {
  const emailQuery = email ? { email } : {};
  const result = await OrderModel.find(emailQuery);
  if (result.length > 0) {
    return result;
  }
  throw new Error('Order not found');
};
