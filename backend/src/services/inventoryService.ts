// src/services/InventoryService.ts
export class inventoryService {
  /**
   * Calcula el stock disponible considerando reservas pendientes
   */
  static calcularStockDisponible(
    stockActual: number,
    stockReservado: number
  ): number {
    if (stockActual < 0) throw new Error('Stock actual no puede ser negativo');
    if (stockReservado < 0) throw new Error('Stock reservado no puede ser negativo');
    
    const disponible = stockActual - stockReservado;
    return Math.max(disponible, 0); // No retornar valores negativos
  }
  
  /**
   * Valida si hay stock suficiente para una venta
   */
  static validarStockParaVenta(
    stockActual: number,
    cantidadSolicitada: number,
    stockMinimo: number = 0
  ): { suficiente: boolean; mensaje?: string } {
    if (cantidadSolicitada <= 0) {
      return { suficiente: false, mensaje: 'Cantidad solicitada debe ser mayor a 0' };
    }
    
    const stockDespuesDeVenta = stockActual - cantidadSolicitada;
    
    if (stockDespuesDeVenta < 0) {
      return { 
        suficiente: false, 
        mensaje: `Stock insuficiente. Disponible: ${stockActual}, Solicitado: ${cantidadSolicitada}` 
      };
    }
    
    if (stockDespuesDeVenta < stockMinimo) {
      return { 
        suficiente: true, 
        mensaje: `Atención: Después de esta venta, el stock quedará por debajo del mínimo (${stockMinimo})` 
      };
    }
    
    return { suficiente: true };
  }
}