export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
  }
  
  export const products: Product[] = [
    { id: 1, name: "Product 1", price: 100, stock: 10 },
    { id: 2, name: "Product 2", price: 150, stock: 20 },
    { id: 3, name: "Product 3", price: 200, stock: 5 }
  ];
  
  export const getAllProducts = (): Product[] => {
    console.log(products);
    return products;
  };
  
  export const getProductById = (id: number): Product | undefined => {
    return products.find(product => product.id === id);
  };
  
  export const updateStock = (id: number, newStock: number): boolean => {
    const product = getProductById(id);
    if (product) {
      product.stock = newStock;
      return true;
    }
    return false;
  };
  