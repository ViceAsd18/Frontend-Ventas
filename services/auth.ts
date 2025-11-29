import api from "./axiosInstance";

export const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    return res.data; 
};

export const getProfile = async (token: string) => {
    const res = await api.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` }
    });

    return res.data;
};
