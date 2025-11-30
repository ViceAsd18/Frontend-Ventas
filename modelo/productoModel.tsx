export interface Producto {
    id: number;
    nombre: string;
    categoria: string;
    stock: number;
    precio: number;
    imagen: string;
    descripcion?: string;
    sku?: string;
    marca?: string;
    proveedor?: string;
    fechaCreacion?: string;
}

export const productosMock: Producto[] = [
    {
        id: 1,
        nombre: "Laptop Pro 15\"",
        categoria: "Electrónica",
        stock: 52,
        precio: 1299.99,
        descripcion: "La Laptop Pro 15\" combina un rendimiento revolucionario, una impresionante pantalla Liquid Retina XDR y una duración de batería excepcional. Perfecta para profesionales creativos y usuarios exigentes.",
        sku: "LP15-X2023",
        marca: "ProTech",
        proveedor: "Global Electronics Inc.",
        fechaCreacion: "15 de Enero, 2023",
        imagen: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        nombre: "Auriculares Wireless X",
        categoria: "Electrónica",
        stock: 120,
        precio: 199.99,
        descripcion: "Auriculares inalámbricos con cancelación de ruido, sonido envolvente y hasta 20 horas de batería.",
        sku: "AWX-2023",
        marca: "SoundMax",
        proveedor: "AudioTech Solutions",
        fechaCreacion: "10 de Marzo, 2023",
        imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        nombre: "Smartwatch S10",
        categoria: "Wearables",
        stock: 35,
        precio: 349.99,
        descripcion: "Smartwatch con monitoreo de salud, notificaciones inteligentes y diseño elegante para cualquier ocasión.",
        sku: "SW10-2023",
        marca: "TechWear",
        proveedor: "Wearable Innovations",
        fechaCreacion: "22 de Febrero, 2023",
        imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        nombre: "Tablet Ultra 12\"",
        categoria: "Electrónica",
        stock: 18,
        precio: 799.99,
        descripcion: "Tablet de 12\" con pantalla retina, alta capacidad de almacenamiento y soporte para lápiz digital.",
        sku: "TU12-2023",
        marca: "TabTech",
        proveedor: "Digital Devices Co.",
        fechaCreacion: "05 de Abril, 2023",
        imagen: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80"
    }
];