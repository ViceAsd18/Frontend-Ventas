import { Layout, Drawer, Button } from "antd";
import { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import MenuVendedor from "componentes/moleculas/BarraNavegacion/MenuVendedor";
import UsuarioSidebar from "componentes/moleculas/BarraNavegacion/UsuarioSidebar";

const { Header, Content, Footer, Sider } = Layout;
const ANCHO_COMPLETO = 250;
const ANCHO_COLAPSADO = 80;

const VendedorLayout = ({ children }: { children: React.ReactNode }) => {
    const [colapsado, setColapsado] = useState(false);
    const [movil, setMovil] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);

    useEffect(() => {
        const manejarResize = () => setMovil(window.innerWidth < 768);
        manejarResize();
        window.addEventListener("resize", manejarResize);
        return () => window.removeEventListener("resize", manejarResize);
    }, []);

    const alternarColapsado = () => {
        setColapsado(!colapsado);
    };

    const layoutPrincipalStyle: React.CSSProperties = {
        minHeight: "100vh"
    };

    const siderStyle: React.CSSProperties = {
        background: "#001529",
        boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
    };

    const contenidoMenuStyle: React.CSSProperties = {
        flex: 1,
        marginTop: 16,
        overflowY: "auto",
        padding: "0 8px 16px 8px"
    };

    const layoutContenidoStyle: React.CSSProperties = {
        marginLeft: !movil ? (colapsado ? ANCHO_COLAPSADO : ANCHO_COMPLETO) : 0,
        transition: "all 0.2s",
        minHeight: "100vh"
    };

    const headerStyle: React.CSSProperties = {
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "#fff",
        padding: "0 24px",
        borderBottom: "1px solid #f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        height: 64,
    };

    const contenedorTituloStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: 16
    };

    const tituloStyle: React.CSSProperties = {
        fontSize: "18px",
        color: "#1890ff",
        margin: 0
    };

    const btnMenuStyle: React.CSSProperties = {
        fontSize: "16px",
        width: 40,
        height: 40,
    };

    const contenidoStyle: React.CSSProperties = {
        padding: '1%',
        margin: 0,
        minHeight: "calc(100vh - 128px)",
        background: "#fafafa",
    };

    const contenedorPrincipalStyle: React.CSSProperties = {
        borderRadius: 8,
        padding: 24,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        minHeight: "calc(100vh - 180px)"
    };

    const footerStyle: React.CSSProperties = {
        textAlign: "center",
        padding: "16px 24px",
        background: "#fafafa",
        borderTop: "1px solid #f0f0f0",
        color: "#666"
    };

    const drawerStyle: React.CSSProperties = {
        padding: 0,
        background: "#001529"
    };

    return (
        <Layout style={layoutPrincipalStyle}>
            {!movil && (
                <Sider
                    width={ANCHO_COMPLETO}
                    collapsedWidth={ANCHO_COLAPSADO}
                    collapsible
                    collapsed={colapsado}
                    onCollapse={setColapsado}
                    style={siderStyle}
                    trigger={null}
                >
                    <UsuarioSidebar colapsado={colapsado} />
                    <div style={contenidoMenuStyle}>
                        <MenuVendedor />
                    </div>
                </Sider>
            )}

            {movil && (
                <Drawer
                    title="Menú"
                    placement="left"
                    closable={true}
                    onClose={() => setDrawerVisible(false)}
                    open={drawerVisible}
                    bodyStyle={drawerStyle}
                    width={280}
                >
                    <UsuarioSidebar colapsado={false} />
                    <div style={{ padding: "0 8px" }}>
                        <MenuVendedor/>
                    </div>
                </Drawer>   
            )}

            <Layout style={layoutContenidoStyle}>
                <Header style={headerStyle}>
                    <div style={contenedorTituloStyle}>
                        {!movil && (
                            <Button
                                type="text"
                                icon={colapsado ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={alternarColapsado}
                                style={btnMenuStyle}
                            />
                        )}
                        <b style={tituloStyle}>
                            Panel del Vendedor
                        </b>
                    </div>

                    {movil && (
                        <Button
                            type="primary"
                            onClick={() => setDrawerVisible(true)}
                            icon={<MenuUnfoldOutlined />}
                        >
                            Menú
                        </Button>
                    )}
                </Header>

                <Content style={contenidoStyle}>
                    <div style={contenedorPrincipalStyle}>
                        {children}
                    </div>
                </Content>

                <Footer style={footerStyle}>
                    © 2025 Sistema Gestor de Ventas
                </Footer>
            </Layout>
        </Layout>
    );
};

export default VendedorLayout;