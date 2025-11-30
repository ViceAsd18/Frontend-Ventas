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
        try {
            const hide = message.loading("Verificando credenciales...", 0);

            //login
            const loginData: AuthResponse = await loginRequest(email, password);

            localStorage.setItem("token", loginData.access_token);

            // Ahora interceptor lo usará automáticamente
            const user: User = await getProfile();

            // Guardamos usuario y token en contexto
            login({ token: loginData.access_token, user });

            hide();
            if (user.rol.toLowerCase() === "cliente") {
                navigate("/");
            } else {
                navigate("/dashboard");
            }

        } catch (error: any) {
            console.error("Error al iniciar sesión:", error);
        }
    };


    return <LoginForm onSubmit={handleLogin} />;
};

export default LoginPage;
