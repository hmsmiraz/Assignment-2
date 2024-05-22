import { Request, Response } from 'express';
import { ProductServices } from './product.service';
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message:
        err.message || 'Something is missing or invalid, check and try again',
      error: err,
    });
    // console.log(err);
  }
};
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductFromDB();
    res.status(200).json({
      success: true,
      message: 'Products  are retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message:
        err.message || 'Something is missing or invalid, check and try again',
      error: err,
    });
  }
};
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product is retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message:
        err.message || 'Something is missing or invalid, check and try again',
      error: err,
    });
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product is deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message:
        err.message || 'Something is missing or invalid, check and try again',
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
};
