import { saleService } from '../../src/services/saleService';

describe('SaleService - Unit Tests', () => {
  describe('calcularTotalVenta', () => {
    it('debe calcular venta simple con IVA 12%', () => {
      const items = [{ precio: 100, cantidad: 2 }];
      const result = saleService.calcularTotalVenta(items);
      
      // Subtotal: 100 * 2 = 200
      // IVA 12%: 200 * 0.12 = 24
      // Total: 200 + 24 = 224
      
      expect(result.subtotal).toBe(200);
      expect(result.iva).toBe(24);
      expect(result.total).toBe(224);
    });
  });
});