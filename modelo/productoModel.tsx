export interface Producto {
    id: number;
    nombre: string;
    categoria: string;
    stock: number;
    precio: number;
    imagen: string;
}

// También puedes exportar datos mock iniciales
export const productosMock: Producto[] = [
    {
        id: 1,
        nombre: "Smartphone Z-10",
        categoria: "Electrónica",
        stock: 85,
        precio: 799.00,
        imagen: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150"
    },

    {
        id: 2,
        nombre: "Silla ErgoMax",
        categoria: "Mobiliario",
        stock: 45,
        precio: 250.00,
        imagen: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop"
    },

    {
        id: 3,
        nombre: "Teclado Gamer K-900",
        categoria: "Accesorios",
        stock: 200,
        precio: 150.00,
        imagen: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=150&h=150&fit=crop"
    },

    {
        id: 4,
        nombre: "Monitor UltraView 34",
        categoria: "Electrónica",
        stock: 60,
        precio: 550.00,
        imagen: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=150&h=150&fit=crop"
    },
    
    
];