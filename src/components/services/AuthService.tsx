import axios from "axios";

export class AuthService {
    private static apiUrl = "http://localhost:5000/api/auth"; // ✅ API Base URL

    // ✅ User Login
    static async login(
        email: string,
        password: string
    ): Promise<{ success: boolean; token?: string; error?: string }> {
        try {
            const response = await axios.post(`${this.apiUrl}/login`, { email, password });

            this.saveToken(response.data.token); // ✅ Store Token
            return { success: true, token: response.data.token };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || "Login failed.",
            };
        }
    }

    // ✅ User Registration
    static async register(
        name: string,
        email: string,
        password: string,
        phoneNumber: string
    ): Promise<{ success: boolean; message?: string; error?: string }> {
        try {
            const response = await axios.post(`${this.apiUrl}/register`, { name, email, password, phoneNumber });

            return { success: true, message: response.data.message };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.message || "Registration failed.",
            };
        }
    }

    // ✅ Fetch User Details (Requires JWT Token)
    static async getUser(): Promise<{ success: boolean; user?: any; error?: string }> {
        try {
            const token = this.getToken();
            if (!token) return { success: false, error: "No token found" };

            const response = await axios.get(`${this.apiUrl}/user`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return { success: true, user: response.data.user };
        } catch (error) {
            return { success: false, error: "Failed to fetch user data" };
        }
    }

    // ✅ Save JWT Token in Local Storage
    static saveToken(token: string): void {
        localStorage.setItem("authToken", token);
    }

    // ✅ Get Token from Local Storage
    static getToken(): string | null {
        return localStorage.getItem("authToken");
    }

    // ✅ Logout (Remove Token & Redirect)
    static logout(): void {
        localStorage.removeItem("authToken");
        window.location.href = "/login"; // Redirect to login page
    }

    // ✅ Check if User is Authenticated
    static isAuthenticated(): boolean {
        return this.getToken() !== null;
    }

    // ✅ Validate Token with Server
    static async validateToken(): Promise<boolean> {
        try {
            const token = this.getToken();
            if (!token) return false;

            await axios.get(`${this.apiUrl}/validate-token`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return true; // Token is valid
        } catch (error) {
            this.logout(); // Remove invalid token
            return false;
        }
    }
}