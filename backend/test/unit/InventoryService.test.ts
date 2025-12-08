// tests/unit/inventoryService.test.ts
import { inventoryService } from '../../src/services/inventoryService';

describe('inventoryService - Unit Tests', () => {
  describe('calcularStockDisponible', () => {
    it('debe calcular correctamente el stock disponible', () => {
      expect(inventoryService.calcularStockDisponible(100, 20)).toBe(80);
      expect(inventoryService.calcularStockDisponible(50, 50)).toBe(0);
      expect(inventoryService.calcularStockDisponible(30, 40)).toBe(0); // No negativo
    });

    it('debe lanzar error con valores negativos', () => {
      expect(() => inventoryService.calcularStockDisponible(-10, 5))
        .toThrow('Stock actual no puede ser negativo');
      expect(() => inventoryService.calcularStockDisponible(10, -5))
        .toThrow('Stock reservado no puede ser negativo');
    });
  });

  describe('validarStockParaVenta', () => {
    it('debe aprobar venta cuando hay stock suficiente', () => {
      const result = inventoryService.validarStockParaVenta(100, 30, 10);
      expect(result.suficiente).toBe(true);
      expect(result.mensaje).toBeUndefined();
    });

    it('debe rechazar venta cuando no hay stock suficiente', () => {
      const result = inventoryService.validarStockParaVenta(10, 30, 5);
      expect(result.suficiente).toBe(false);
      expect(result.mensaje).toContain('Stock insuficiente');
    });

    it('debe mostrar advertencia cuando quede bajo stock mínimo', () => {
      const result = inventoryService.validarStockParaVenta(15, 10, 10);
      expect(result.suficiente).toBe(true);
      expect(result.mensaje).toContain('Atención');
    });
  });
});