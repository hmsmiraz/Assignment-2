import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await ProductModel.create(productData);
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const query = { _id: id };
  const result = await ProductModel.findOne(query);
  return result;
};

export const updateProductInDB = async (id: string, product: TProduct) => {
  const result = await ProductModel.findOneAndUpdate({ _id: id }, product);
  return result;
};
export const getProductBySearch = async (searchTerm: string) => {
  const searchQuery: any = {};
  if (searchTerm) {
    searchQuery.$or = [
      { name: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
      { tags: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
    ];
  }
  const result = await ProductModel.find(searchQuery);
  return result;
};
const deleteProductFromDB = async (id: string) => {
  const query = { _id: id };
  const result = await ProductModel.findByIdAndDelete(query);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getSingleProductFromDB,
  updateProductInDB,
  getProductBySearch,
  deleteProductFromDB,
};
