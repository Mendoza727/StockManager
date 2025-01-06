export const StockFormatter = (stock: number): string => {
    if (stock < 1000) {
      return stock.toString() + ' u'; // Para números menores a 1000, muestra 'u' como unidades
    } else if (stock < 1000000) {
      return (stock / 1000).toFixed(1) + 'K'; // Muestra en miles (K)
    } else {
      return (stock / 1000000).toFixed(1) + 'M'; // Muestra en millones (M)
    }
  };
  