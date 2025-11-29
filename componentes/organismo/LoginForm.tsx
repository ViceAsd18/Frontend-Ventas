import { Form, Input, Button, Card } from "antd";
import Titulo from "componentes/atomos/Titulo";
import { useNavigate } from "react-router";
import { login } from "services/auth";

interface Props {
    onLogin: (email: string, password: string) => void;
    loading?: boolean;
}



const LoginForm = ({ onLogin, loading = false }: Props) => {

    const navigate = useNavigate();

    const [form] = Form.useForm();

    const colors = {
        primary: "#2690ed",
        text: "#0d151b",
        textSecondary: "#4c759a",
        border: "#cfdce7",
        bgLight: "#ffffff",
        shadow: "0 4px 16px rgba(0,0,0,0.06)"
    };

    const styles: Record<string, React.CSSProperties> = {
        pageContainer: {
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f6f7f8",
            padding: 16
        },
        card: {
            width: 420,
            padding: "40px 32px",
            borderRadius: 16,
            boxShadow: colors.shadow,
            border: `1px solid ${colors.border}`,
            background: colors.bgLight
        },
        iconContainer: {
            display: "flex",
            justifyContent: "center",
            marginBottom: 16
        },
        icon: {
            fontSize: 60,
            color: colors.primary
        },
        title: {
            textAlign: "center",
            fontSize: 26,
            fontWeight: 700,
            marginBottom: 28,
            color: colors.text
        },
        input: {
            height: 46,
            borderRadius: 8
        },
        button: {
            height: 46,
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 600,
            background: colors.primary
        },
        register: {
            marginTop: 20,
            textAlign: "center",
            fontSize: 14,
            color: colors.textSecondary
        },
        registerLink: {
            color: colors.primary,
            fontWeight: 600,
            cursor: "pointer"
        }
    };

    const handleSubmit = async (values: any) => {
        try {
            const data = await login(values.email, values.password);

            //Guardar token en localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            //Redirigir según rol
            if (data.user.role === "cliente") {
                navigate("/");
            } else if (data.user.role === "empleado") {
                navigate("/dashboard");
            } else {
                navigate('/'); //Fallback por si no se reconoce el rol
            }

        } catch (error) {
            console.error("Error al iniciar sesion:", error);
        }
    };

    return (
        <div style={styles.pageContainer}>
            <Card style={styles.card}>
                
                <Titulo nivel={3} style={styles.title}>
                    Accede a tu cuenta
                </Titulo>

                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        label="Correo electrónico"
                        name="email"
                        rules={[
                            { required: true, message: "Ingresa tu correo" },
                            { type: "email", message: "Correo inválido" }
                        ]}
                    >
                        <Input
                            placeholder="ejemplo@correo.com"
                            style={styles.input}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Contraseña"
                        name="password"
                        rules={[{ required: true, message: "Ingresa tu contraseña" }]}
                    >
                        <Input.Password
                            placeholder="********"
                            style={styles.input}
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                        style={styles.button}
                    >
                        Iniciar sesión
                    </Button>
                </Form>

                <p style={styles.register}>
                    ¿Nuevo usuario?{" "}
                    <span style={styles.registerLink} onClick={() => navigate("/registro" )}>
                        Crea una cuenta
                    </span>
                </p>
            </Card>
        </div>
    );
};

export default LoginForm;
