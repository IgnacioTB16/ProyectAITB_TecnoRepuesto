import request from 'supertest';
import { app } from '../../src/app';

describe('Productos API - Pruebas de Integración', () => {
  it('debe crear un producto', async () => {
    const producto = {
      codigo: 'TEST-001',
      nombre: 'Producto Test',
      precio_venta: 25.50,
      stock_actual: 100
    };
    
    const response = await request(app)
      .post('/api/productos')
      .send(producto)
      .expect(201);
    
    expect(response.body).toHaveProperty('id');
    expect(response.body.codigo).toBe('TEST-001');
  });
});
