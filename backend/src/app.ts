// src/app.ts
import express, { Express } from 'express';
import cors from 'cors';
import productRoutes from './routes/product.routes';

const app: Express = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/productos', productRoutes);

// Health check
app.get('/health', (req: express.Request, res: express.Response) => {
  res.status(200).json({ status: 'OK' });
});

export { app };

