import { Request, Response } from 'express';
import productValidationSchema from './product.validation';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;
    const zodParseData = productValidationSchema.parse(productData);
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
      const { productsId } = req.params;
      const result = await ProductServices.getSingleProductFromDB(productsId);
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
      const { productsId } = req.params;
      const result = await ProductServices.deleteProductFromDB(productsId);
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
