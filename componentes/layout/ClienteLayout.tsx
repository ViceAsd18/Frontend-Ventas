import { Layout, Menu, Button, Badge } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "auth/AuthContext";

const { Header, Content, Footer } = Layout;

const ClienteLayout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState('inicio');

    const { user, logout } = useAuth();

    const headerStyle: React.CSSProperties = {
        position: 'sticky',
        top: 0,
        zIndex: 10,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        padding: '0 24px',
        height: '64px'
    };

    const logoStyle: React.CSSProperties = {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#001529',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer'
    };

    const itemsMenu = [
        { key: 'inicio', label: 'Inicio', onClick: () => navigate('/cliente/home_cliente') },
        { key: 'tienda', label: 'Tienda', onClick: () => navigate('/cliente/tienda') },
        { key: 'ordenes', label: 'Mis Órdenes', onClick: () => navigate('/cliente/mis-ordenes') },
    ];

    return (
        <Layout style={{ minHeight: '100vh', background: '#fff' }}>
            <Header style={headerStyle}>
                {/* Logo */}
                <div style={logoStyle} onClick={() => navigate('/cliente/home_cliente')}>
                    <div style={{ width: 24, height: 24, background: '#1890ff', borderRadius: 4 }}></div>
                    SalesSystem
                </div>

                {/* Menú Central */}
                <Menu
                    mode="horizontal"
                    selectedKeys={[current]}
                    onClick={(e) => setCurrent(e.key)}
                    items={itemsMenu}
                    style={{ flex: 1, justifyContent: 'center', borderBottom: 'none' }}
                />

                {/* Acciones Derecha (Carrito y Perfil) */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                {user ? (
                    <Button
                        type="primary"
                        shape="round"
                        icon={<UserOutlined />}
                        onClick={logout}
                    >
                        Cerrar Sesión
                    </Button>
                ) : (
                    <Button
                        type="primary"
                        shape="round"
                        icon={<UserOutlined />}
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </Button>
                )}
            </div>
            </Header>

            <Content style={{ padding: '0 24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                <div style={{ margin: '24px 0', minHeight: 380 }}>
                    {children}
                </div>
            </Content>

            <Footer style={{ textAlign: 'center', background: '#fafafa' }}>
                © 2025 SalesSystem. Todos los derechos reservados.
            </Footer>   
        </Layout>
    )
};

export default ClienteLayout;