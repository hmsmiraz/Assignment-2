import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await ProductModel.create(productData);
  return result;
};
const getAllProductFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};
const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ id });
  return result;
};
const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
};
