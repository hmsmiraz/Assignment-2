import { Request, Response } from 'express';
import {
  ProductServices,
  getProductBySearch,
  updateProductInDB,
} from './product.service';
import ProductValidation from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const zodParseData = ProductValidation.parse(product);
    const result = await ProductServices.createProductIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'Product is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something is missing or invalid, check and try again',
      error: err,
    });
  }
};
const getProduct = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query?.searchTerm;
    const result = await getProductBySearch(searchTerm as string);
    res.status(200).send({
      success: true,
      message: 'Product fetched successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await ProductServices.getSingleProductFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Product is retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something is missing or invalid, check and try again',
      error: err,
    });
  }
};
const updateProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const product = req.body;
    const value = ProductValidation.parse(product);
    await updateProductInDB(id, value);
    res.send({
      success: true,
      message: 'Product is updated successfully!',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await ProductServices.deleteProductFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Product is deleted successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something is missing or invalid, check and try again',
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getProduct,
  getSingleProduct,
  updateProductById,
  deleteProduct,
};
