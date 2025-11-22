import { LogoutOutlined } from "@ant-design/icons"
import { Avatar, Dropdown, type MenuProps } from "antd"

const UsuarioSidebar = ({ colapsado }: { colapsado?: boolean }) => {
    
    const contenedorStyle: React.CSSProperties = {
        padding: colapsado ? '24px 8px' : '24px 16px',
        textAlign: 'center',
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    }

    const contenedorPerfilStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        gap: colapsado ? 0 : 12
    }

    const avatarStyle: React.CSSProperties = {
        backgroundColor: '#1890ff',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        fontSize: colapsado ? '20px' : '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const nombreUsuarioStyle: React.CSSProperties = {
        color: "#fff", 
        fontWeight: "600",
        fontSize: "14px",
    }

    const rolUsuarioStyle: React.CSSProperties = {
        color: "rgba(255, 255, 255, 0.7)", 
        fontSize: "12px",
        marginTop: 2
    }

    const opcionesMenu: MenuProps["items"] = [
        {
            key: 'cerrar-sesion',
            label: 'Cerrar sesión',
            icon: <LogoutOutlined />,
            onClick: () => {
                console.log("Cerrando sesión..."); //Agregar logica para cerrar sesión mas adelante
            }
        }
    ]

    return (
        <div style={contenedorStyle}>
            <Dropdown menu={{ items: opcionesMenu }} placement="bottomRight">
                <div style={contenedorPerfilStyle}>
                    <Avatar 
                        size={colapsado ? 48 : 58}
                        style={avatarStyle}
                    >
                        👤
                    </Avatar>
                    
                    {!colapsado && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={nombreUsuarioStyle}>
                                Nombre Usuario
                            </div>
                            <div style={rolUsuarioStyle}>
                                Rol Usuario
                            </div>
                        </div>
                    )}
                </div>
            </Dropdown>
        </div>
    )
}

export default UsuarioSidebar