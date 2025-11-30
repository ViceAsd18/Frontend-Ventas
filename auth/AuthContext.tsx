// AuthContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getProfile } from "services/auth";
import { type User } from "modelo/User";

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (data: { user: User; token: string }) => void;
    logout: () => void;
    refreshProfile: () => Promise<void>;
    loading: boolean;

}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        if (typeof window === "undefined") return null;

        try {
            const saved = localStorage.getItem("user");
            if (!saved) return null;

            const parsed = JSON.parse(saved);
            // opcional: verificar que tenga la propiedad 'id'
            if (parsed && parsed.id) return parsed as User;
            return null;
        } catch {
            return null;
        }
    });


    const [token, setToken] = useState<string | null>(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("token");
        }
        return null;
    });

    const [loading, setLoading] = useState(true);



    const login = (data: { user: User; token: string }) => {
        setUser(data.user);
        setToken(data.token);

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const refreshProfile = async () => {
        try {
            if (!token) return;
            const profile = await getProfile();
            setUser(profile);
            localStorage.setItem("user", JSON.stringify(profile));
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    useEffect(() => {
        const init = async () => {
            if (token && !user) {
                await refreshProfile();
            }
            setLoading(false); 
        };
        init();
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, logout, refreshProfile, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
