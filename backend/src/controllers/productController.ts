import { Request, Response } from 'express';
import { getAllProducts, getProductById, updateStock } from '../models/productModel';

export const getAllTheProducts = (req: Request, res: Response) => {
  // console.log('getAllTheProducts');
  
  const products = getAllProducts();
  res.json(products);
};

export const getOneProduct = (req: Request, res: Response) => {
  const product = getProductById(parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'product not found' });
  }
};

export const update = (req: Request, res: Response) => {
  const { stock } = req.body;
  const updated = updateStock(parseInt(req.params.id), stock);
  if (updated) {
    res.json({ message: 'stock updated' });
  } else {
    res.status(404).json({ message: 'product not found' });
  }
};
