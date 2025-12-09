import { inventoryService } from '../../src/services/inventoryService';
describe('inventoryService - Unit Tests', () => {
  describe('calcularStockDisponible', () => {
    it('debe calcular correctamente el stock disponible', () => {
      expect(inventoryService.calcularStockDisponible(100, 20)).toBe(80);
      expect(inventoryService.calcularStockDisponible(50, 50)).toBe(0);
      expect(inventoryService.calcularStockDisponible(30, 40)).toBe(0); // No negativo
    });

    it('debe manejar correctamente casos con stock reservado cero', () => {
      expect(inventoryService.calcularStockDisponible(100, 0)).toBe(100);
      expect(inventoryService.calcularStockDisponible(50, 0)).toBe(50);
    });

    it('debe manejar correctamente casos con stock actual cero', () => {
      expect(inventoryService.calcularStockDisponible(0, 0)).toBe(0);
      expect(inventoryService.calcularStockDisponible(0, 10)).toBe(0);
    });

    it('debe lanzar error con valores negativos', () => {
      expect(() => inventoryService.calcularStockDisponible(-10, 5))
        .toThrow('Stock actual no puede ser negativo');
      expect(() => inventoryService.calcularStockDisponible(10, -5))
        .toThrow('Stock reservado no puede ser negativo');
      expect(() => inventoryService.calcularStockDisponible(-10, -5))
        .toThrow('Stock actual no puede ser negativo');
    });

    it('debe manejar valores grandes correctamente', () => {
      expect(inventoryService.calcularStockDisponible(1000000, 500000)).toBe(500000);
      expect(inventoryService.calcularStockDisponible(999999, 1000000)).toBe(0);
    });
  });

  describe('validarStockParaVenta', () => {
    it('debe aprobar venta cuando hay stock suficiente', () => {
      const result = inventoryService.validarStockParaVenta(100, 30, 10);
      expect(result.suficiente).toBe(true);
      expect(result.mensaje).toBeUndefined();
    });

    it('debe aprobar venta cuando el stock es exactamente igual a la cantidad solicitada', () => {
      const result = inventoryService.validarStockParaVenta(50, 50, 10);
      expect(result.suficiente).toBe(true);
      expect(result.mensaje).toContain('Atención');
    });

    it('debe rechazar venta cuando no hay stock suficiente', () => {
      const result = inventoryService.validarStockParaVenta(10, 30, 5);
      expect(result.suficiente).toBe(false);
      expect(result.mensaje).toContain('Stock insuficiente');
      expect(result.mensaje).toContain('Disponible: 10');
      expect(result.mensaje).toContain('Solicitado: 30');
    });

    it('debe rechazar venta cuando la cantidad solicitada es cero o negativa', () => {
      const result1 = inventoryService.validarStockParaVenta(100, 0, 10);
      expect(result1.suficiente).toBe(false);
      expect(result1.mensaje).toBe('Cantidad solicitada debe ser mayor a 0');

      const result2 = inventoryService.validarStockParaVenta(100, -5, 10);
      expect(result2.suficiente).toBe(false);
      expect(result2.mensaje).toBe('Cantidad solicitada debe ser mayor a 0');
    });

    it('debe mostrar advertencia cuando quede bajo stock mínimo', () => {
      const result = inventoryService.validarStockParaVenta(15, 10, 10);
      expect(result.suficiente).toBe(true);
      expect(result.mensaje).toContain('Atención');
      expect(result.mensaje).toContain('stock quedará por debajo del mínimo');
    });

    it('debe manejar correctamente cuando el stock mínimo es cero', () => {
      const result = inventoryService.validarStockParaVenta(50, 30, 0);
      expect(result.suficiente).toBe(true);
      expect(result.mensaje).toBeUndefined();
    });

    it('debe manejar correctamente cuando el stock mínimo no se especifica', () => {
      const result = inventoryService.validarStockParaVenta(50, 30);
      expect(result.suficiente).toBe(true);
      expect(result.mensaje).toBeUndefined();
    });

    it('debe rechazar venta cuando el stock actual es cero', () => {
      const result = inventoryService.validarStockParaVenta(0, 10, 5);
      expect(result.suficiente).toBe(false);
      expect(result.mensaje).toContain('Stock insuficiente');
      expect(result.mensaje).toContain('Disponible: 0');
    });

    it('debe manejar correctamente valores grandes', () => {
      const result = inventoryService.validarStockParaVenta(1000000, 500000, 100000);
      expect(result.suficiente).toBe(true);
      expect(result.mensaje).toBeUndefined();
    });

    it('no debe mostrar advertencia cuando el stock queda exactamente en el mínimo', () => {
      const result = inventoryService.validarStockParaVenta(20, 10, 10);
      expect(result.suficiente).toBe(true);
      expect(result.mensaje).toBeUndefined();
    });
  });
});