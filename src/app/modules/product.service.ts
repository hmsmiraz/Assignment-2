import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  if (await Product.isProductExists(productData.id)) {
    throw new Error('Product Already Exists');
  }
  const result = await Product.create(productData);
  return result;
};
const getAllProductFromDB = async () => {
    const result = await Product.find();
    return result;
  };
  const getSingleProductFromDB = async (id: string) => {
    const result = await Product.findOne({ id });
    return result;
  };
  const deleteProductFromDB = async (id: string) => {
    const result = await Product.updateOne({ id }, { isDeleted: true });
    return result;
  };
  
  export const StudentServices = {
   createProductIntoDB,
   getAllProductFromDB,
   getSingleProductFromDB,
   deleteProductFromDB,
  };