import React from "react";
import { Row, Col, Typography, Space, Divider } from "antd";
import type {Producto} from "../../../services/productos";
import ImagenProducto from "../../atomos/ImagenProducto";
import Titulo from "../../atomos/Titulo";
import BadgeStock from "../../atomos/BadgeStock";
import BadgeCategoria from "../../atomos/BadgeCategoria";
const { Text } = Typography;

interface Props {
    producto: Producto;
}

const MAPA_IMAGENES: Record<string, string> = {
    // Los que ya tenías
    "Lechuga Costina": "/assets/img/productos/lechuga-costina.png",
    "Coca Cola Original 350ml": "/assets/img/productos/lata-coca.png",
    "Galletas Oreo Tubo": "/assets/img/productos/galleta-oreo.png",

    // ABARROTES
    "Aceite de Girasol": "/assets/img/productos/Aceite_de_Girasol_1L.jpg",
    "Arroz Grado 1": "/assets/img/productos/arroz_grado_1_1kg.jpg",
    "Fideos Spaghetti": "/assets/img/productos/fideos_spaghetti_400g.jpg",
    "Pan Hallulla": "/assets/img/productos/Pan_Hallulla_Bolsa_10u.jpg",
    "Pan Integral": "/assets/img/productos/Pan_Integral_500g.jpg",

    // BEBIDAS Y LICORES
    "Cerveza Cristal": "/assets/img/productos/Cerveza_Cristal_Lata_350ml.jpg",
    "Coca Cola 1.5L": "/assets/img/productos/coca-cola_1.5l.jpg",
    "Jugo de Naranja": "/assets/img/productos/Jugo_de_Naranja_1L.jpg",
    "Vino Tinto Cabernet": "/assets/img/productos/Vino_Tinto_Cabernet_Sauvignon_750ml.jpg",

    // LÁCTEOS Y FRESCOS
    "Leche Entera": "/assets/img/productos/leche_entera_1l.jpg",
    "Helado de Chocolate": "/assets/img/productos/helado_de_chocolate_1l.jpg",
    "Helado de Vainilla": "/assets/img/productos/Helado_de_Vainilla_1L.jpg",
    "Jamón Cocido": "/assets/img/productos/jamón_cocido_250g.jpg",
    "Queso Mantecoso": "/assets/img/productos/Queso_Mantecoso_200g.jpg",
    "Salchichas Vienesas": "/assets/img/productos/Salchichas_Vienesas_Pack_12u.jpg",
    "Yoghurt Batido": "/assets/img/productos/Yoghurt_Batido_Frutilla_155g.jpg",

    // FRUTAS Y VERDURAS
    "Manzana Roja": "/assets/img/productos/Manzana_Roja_1kg.jpg",
    "Plátano": "/assets/img/productos/Plátano_1kg.jpg",

    // ASEO Y HOGAR
    "Arena para Gatos": "/assets/img/productos/Arena_Sanitaria_para_Gatos_5kg.jpg",
    "Comida para Perro": "/assets/img/productos/Comida_para_Perro_1kg.jpg",
    "Detergente en Polvo": "/assets/img/productos/detergente_en_polvo_1kg.jpg",
    "Detergente Líquido": "/assets/img/productos/Detergente_Líquido_1L.jpg",
    "Encendedor": "/assets/img/productos/Encendedor_Bic.jpg",

    // CUIDADO PERSONAL / FARMACIA
    "Paracetamol": "/assets/img/productos/Paracetamol_500mg_10u.jpg",
    "Pasta Dental": "/assets/img/productos/Pasta_Dental_100ml.jpg",
    "Shampoo Familiar": "/assets/img/productos/shampoo_familiar_750ml.jpg",
    "Papas Fritas": "/assets/img/productos/papas_fritas_lays_140g.jpg",

    // Fallback
    "default": "https://via.placeholder.com/400?text=Sin+Imagen"
};


const precioStyle: React.CSSProperties = {
    fontWeight: 400,
    fontSize: '2rem',
    display: 'block',
    margin: '16px 0',
    color: '#000'
};

const detalleAdicionales: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px'
};

const InfoProductoCliente = ({ producto }: Props) => {

    // Resolver Imagen
    const rutaImagen = MAPA_IMAGENES[producto.nombre] || MAPA_IMAGENES["default"];
    const nombreCategoria = (producto.categoria as any).nombre_categoria || "General";

    return (
        <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '1px solid #d9d9d9' }}>
            <Row gutter={[48, 32]} align="middle">

                <Col xs={24} md={12}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        minHeight: '400px'
                    }}>
                        <ImagenProducto
                            src={rutaImagen}
                            alt={producto.nombre}
                            height="100%"
                            width="100%"
                            style={{ objectFit: 'contain', maxHeight: '450px' }}
                        />
                    </div>
                </Col>

                <Col xs={24} md={12}>
                    <Space direction="vertical" size="middle" style={{ width: "100%" }}>

                        {/* Encabezado */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <Titulo nivel={2} style={{ margin: '0 0 10px 0', fontSize: 28 }}>
                                    {producto.nombre}
                                </Titulo>
                                <BadgeCategoria categoria={nombreCategoria} />
                            </div>
                            <BadgeStock stock={producto.stock}/>
                        </div>

                        <div>
                            <Text style={precioStyle}>
                                ${producto.precio.toLocaleString("es-CL", { minimumFractionDigits: 0 })}
                            </Text>
                        </div>

                        <div>
                            <Text style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                                {producto.descripcion || "Sin descripción."}
                            </Text>
                        </div>

                        <Divider />

                        <div>
                            <Titulo nivel={3} style={{fontSize: 20}}>Detalles Adicionales</Titulo>
                            <Space direction="vertical" style={{ width: '100%', marginTop: 10 }} size="small">
                                <div style={detalleAdicionales}>
                                    <Text type="secondary">SKU:</Text>
                                    <Text strong>{producto.sku || 'N/A'}</Text>
                                </div>
                                <div style={detalleAdicionales}>
                                    <Text type="secondary">Marca:</Text>
                                    <Text strong>{producto.marca || 'Genérico'}</Text>
                                </div>
                                <div style={detalleAdicionales}>
                                    <Text type="secondary">Proveedor:</Text>
                                    <Text strong>{producto.proveedor || 'Local'}</Text>
                                </div>
                            </Space>
                        </div>

                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default InfoProductoCliente;