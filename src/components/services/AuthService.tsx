import axios from "axios";

export class AuthService {
    private static apiUrl = "http://localhost:5000/api/auth";

    static async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
        try {
            const response = await axios.post(`${this.apiUrl}/login`, { email, password });

            if (response.data.success) {
                localStorage.setItem("authToken", response.data.token || "");
                localStorage.setItem("walletId", response.data.walletId.toString()); // ✅ Store wallet ID
                return { success: true };
            }

            return { success: false, error: response.data.message };
        } catch (error: any) {
            return { success: false, error: "Login failed." };
        }
    }

    static async register(name: string, email: string, password: string, phoneNumber: string) {
        try {
            const response = await axios.post(`${this.apiUrl}/register`, { name, email, password, phoneNumber });
            return { success: true, message: response.data.message };
        } catch (error: any) {
            return { success: false, error: error.response?.data?.message || "Registration failed." };
        }
    }

    static saveToken(token: string): void {
        localStorage.setItem("authToken", token);
    }

    static getToken(): string | null {
        return localStorage.getItem("authToken");
    }

    static getWalletId(): string | null {
        return localStorage.getItem("walletId"); // ✅ Retrieve wallet ID
    }

    static logout(): void {
        localStorage.removeItem("authToken");
        localStorage.removeItem("walletId"); // ✅ Remove wallet ID on logout
    }

    static isAuthenticated(): boolean {
        return this.getToken() !== null;
    }

    static async validateToken(): Promise<boolean> {
        try {
            const token = this.getToken();
            if (!token) return false;

            await axios.get(`${this.apiUrl}/validate-token`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return true;
        } catch (error) {
            this.logout();
            return false;
        }
    }
}
