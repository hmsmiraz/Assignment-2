import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductsRoutes } from './app/modules/products/product.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', ProductsRoutes);

export default app;
