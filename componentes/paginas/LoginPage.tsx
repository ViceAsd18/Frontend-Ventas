import { message } from "antd";
import { useNavigate } from "react-router";
import { useAuth } from "auth/AuthContext";
import LoginForm from "componentes/organismo/LoginForm";
import { loginRequest, getProfile, type AuthResponse } from "services/auth";
import { type User } from "modelo/User";

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (email: string, password: string) => {
        const hide = message.loading("Verificando credenciales...", 0); // mostramos loading

        try {
            // login
            const loginData: AuthResponse = await loginRequest(email, password);
            localStorage.setItem("token", loginData.access_token);

            // obtener perfil
            const user: User = await getProfile();

            // guardar en contexto
            login({ token: loginData.access_token, user });

            hide(); // ocultamos loading
            message.success("Inicio de sesión exitoso"); // mostramos mensaje OK

            // redireccionar según rol
            if (user.rol.toLowerCase() === "cliente") {
                navigate("/");
            } else {
                navigate("/dashboard");
            }

        } catch (error: any) {
            hide(); // ocultamos loading si falla
            console.error("Error al iniciar sesión:", error);

            if (error.response?.status === 401) {
                message.error("Correo o contraseña incorrecta");
            } else {
                message.error("Ocurrió un error al iniciar sesión");
            }
        }
    };




    return <LoginForm onSubmit={handleLogin} />;
};

export default LoginPage;
