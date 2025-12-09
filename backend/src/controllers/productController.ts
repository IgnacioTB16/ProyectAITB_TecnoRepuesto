// src/controllers/productController.ts
import { Request, Response } from 'express';

export const productController = {
  createProduct: async (req: Request, res: Response) => {
    try {
      const { codigo, nombre, precio_venta, stock_actual } = req.body;
      
      // Validación básica
      if (!codigo || !nombre || precio_venta === undefined || stock_actual === undefined) {
        return res.status(400).json({ 
          error: 'Faltan campos requeridos: codigo, nombre, precio_venta, stock_actual' 
        });
      }

      // Simulación de creación (en producción usarías el repositorio)
      const nuevoProducto = {
        id: Date.now(), // ID temporal para pruebas
        codigo,
        nombre,
        precio_venta: parseFloat(precio_venta),
        stock_actual: parseInt(stock_actual),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      res.status(201).json(nuevoProducto);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el producto' });
    }
  },

  getProducts: async (req: Request, res: Response) => {
    try {
      // Simulación (en producción usarías el repositorio)
      res.status(200).json([]);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  },

  getProductById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      // Simulación (en producción usarías el repositorio)
      res.status(200).json({ id, message: 'Producto encontrado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  },

  updateProduct: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      // Simulación (en producción usarías el repositorio)
      res.status(200).json({ id, ...req.body, updatedAt: new Date() });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  },

  deleteProduct: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      // Simulación (en producción usarías el repositorio)
      res.status(200).json({ message: 'Producto eliminado', id });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  }
};

