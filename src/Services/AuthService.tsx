import axios from "axios";

export class AuthService {
    private static apiUrl = "http://localhost:5000";

    static async login(
        email: string,
        password: string
    ): Promise<{ success: boolean; token?: string; error?: string }> {
        try {
            const response = await axios.post(`${this.apiUrl}/login`, { email, password });
            return { success: true, token: response.data.token };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || "An error occurred during login.",
            };
        }
    }

    static async register(
        name: string,
        email: string,
        password: string,
        phoneNumber: string
    ): Promise<{ success: boolean; message?: string; error?: string }> {
        try {
            const response = await axios.post(`${this.apiUrl}/register`, {
                name,
                email,
                password,
                phoneNumber,
            });
            return { success: true, message: response.data.message };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || "An error occurred during registration.",
            };
        }
    }

    static saveToken(token: string): void {
        localStorage.setItem("authToken", token);
    }

    static getToken(): string | null {
        return localStorage.getItem("authToken");
    }

    static logout(): void {
        localStorage.removeItem("authToken");
    }
}