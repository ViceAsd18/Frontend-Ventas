import { Card, Row, Col, Button, Tag } from "antd";
import { useNavigate } from "react-router";
import type { Producto } from "../../../services/productos";
import Imagen from "../../atomos/ImagenProducto";
import BadgeStock from "../../atomos/BadgeStock";

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

const cardStyle: React.CSSProperties = {
    borderRadius: 16,
    width: "100%",
    maxWidth: 300,
    minWidth: 180,
    margin: "0 auto",
    border: "1px solid #f0f0f0",
    transition: "all 0.3s ease",
};

const contenedorImagenStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "12px",
    height: 220,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ffffff",
    borderRadius: "16px 16px 0 0",
};

const nombreStyle: React.CSSProperties = {
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "1.3em",
    height: "2.6em",
    overflow: "hidden",
    marginBottom: "8px",
    color: "#1f1f1f"
};

const CardProductoCliente = ({ producto }: Props) => {
    const navigate = useNavigate();


    const rutaImagen = MAPA_IMAGENES[producto.nombre] || "https://via.placeholder.com/300?text=Sin+Imagen";

    const nombreCategoria = (producto.categoria as any).nombre_categoria || "General";

    return (
        <Card hoverable style={cardStyle} bodyStyle={{ padding: "16px" }}>
            <div style={contenedorImagenStyle}>
                <Imagen
                    src={rutaImagen}
                    alt={producto.nombre}
                    height="100%"
                    width="100%"
                    style={{ objectFit: "contain", maxHeight: "100%" }}
                />
            </div>

            <div style={{ marginTop: 12 }}>
                <Tag color="blue" style={{ marginBottom: 8, border: 'none', background: '#e6f7ff', color: '#1890ff' }}>
                    {nombreCategoria}
                </Tag>

                <div style={nombreStyle} title={producto.nombre}>
                    {producto.nombre}
                </div>

                <Row align="middle" justify="space-between" style={{ marginTop: 12 }}>
                    <Col>
                        <div style={{ fontWeight: 800, fontSize: "20px", color: "#000" }}>
                            ${producto.precio.toLocaleString("es-CL")}
                        </div>
                    </Col>
                    <Col>
                        <BadgeStock stock={producto.stock} />
                    </Col>
                </Row>
            </div>

            <Button
                type="primary"
                block
                size="large"
                style={{ marginTop: 16, borderRadius: 8, fontWeight: 600 }}
                disabled={producto.stock === 0}
                onClick={() => navigate(`/cliente/producto/${producto.id}`)}
            >
                Ver detalle
            </Button>
        </Card>
    );
};

export default CardProductoCliente;