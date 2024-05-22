import { createOrderService, getOrderService } from './order.service';
import { OrderValidationSchema } from './order.validation';
import { Request, Response } from 'express';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body.orders;
    const value = OrderValidationSchema.parse(order);
    const result = await createOrderService(value);
    res.status(200).json({
      success: true,
      message: 'Order is created successfully',
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
export const getOrder = async (req: Request, res: Response) => {
  try {
    const email = req.query?.email;
    const result = await getOrderService(email as string);
    res.status(200).send({
      success: true,
      message: 'Orders fetched successfully!',
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
