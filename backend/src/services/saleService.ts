// src/services/saleService.ts

interface ItemVenta {
  precio: number;
  cantidad: number;
}

interface TotalVenta {
  subtotal: number;
  iva: number;
  total: number;
}

export class saleService {
  /**
   * Calcula el total de una venta incluyendo IVA
   * @param items Array de items con precio y cantidad
   * @param ivaPorcentaje Porcentaje de IVA (por defecto 12%)
   * @returns Objeto con subtotal, IVA y total
   */
  static calcularTotalVenta(
    items: ItemVenta[],
    ivaPorcentaje: number = 12
  ): TotalVenta {
    if (!items || items.length === 0) {
      throw new Error('Los items no pueden estar vacíos');
    }

    // Validar que todos los items tengan precio y cantidad válidos
    items.forEach((item, index) => {
      if (item.precio < 0) {
        throw new Error(`El precio del item ${index + 1} no puede ser negativo`);
      }
      if (item.cantidad <= 0) {
        throw new Error(`La cantidad del item ${index + 1} debe ser mayor a 0`);
      }
    });

    // Calcular subtotal
    const subtotal = items.reduce(
      (sum, item) => sum + item.precio * item.cantidad,
      0
    );

    // Calcular IVA
    const iva = subtotal * (ivaPorcentaje / 100);

    // Calcular total
    const total = subtotal + iva;

    return {
      subtotal: Math.round(subtotal * 100) / 100, // Redondear a 2 decimales
      iva: Math.round(iva * 100) / 100,
      total: Math.round(total * 100) / 100,
    };
  }
}

