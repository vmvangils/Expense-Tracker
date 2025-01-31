import axios from "axios";

export class AuthService {
    // Define the base API URL (Replace this with your actual backend URL)
    private static apiUrl = "http://localhost:5000";

    /**
     * Sends a login request to the backend.
     * @param email - User's email address
     * @param password - User's password
     * @returns A promise with success status, JWT token (if successful), or an error message.
     */
    static async login(
        email: string,
        password: string
    ): Promise<{ success: boolean; token?: string; error?: string }> {
        try {
            // Make a POST request to the login API endpoint
            const response = await axios.post(`${this.apiUrl}/login`, { email, password });

            // Return success and store the JWT token
            return { success: true, token: response.data.token };
        } catch (error: any) {
            // Handle any errors (e.g., incorrect credentials, server issues)
            return {
                success: false,
                error: error.response?.data?.message || "An error occurred during login.",
            };
        }
    }

    /**
     * Sends a registration request to the backend.
     * @param name - User's full name
     * @param email - User's email address
     * @param password - User's password
     * @param phoneNumber - User's phone number
     * @returns A promise with success status, success message, or an error message.
     */
    static async register(
        name: string,
        email: string,
        password: string,
        phoneNumber: string
    ): Promise<{ success: boolean; message?: string; error?: string }> {
        try {
            // Make a POST request to the register API endpoint
            const response = await axios.post(`${this.apiUrl}/register`, {
                name,
                email,
                password,
                phoneNumber,
            });

            // Return success status with the message
            return { success: true, message: response.data.message };
        } catch (error: any) {
            // Handle errors (e.g., duplicate email, invalid data)
            return {
                success: false,
                error: error.response?.data?.message || "An error occurred during registration.",
            };
        }
    }

    /**
     * Saves the JWT token in the browser's local storage.
     * @param token - JWT authentication token received from the backend
     */
    static saveToken(token: string): void {
        localStorage.setItem("authToken", token);
    }

    /**
     * Retrieves the JWT token from the browser's local storage.
     * @returns The stored JWT token or null if not found.
     */
    static getToken(): string | null {
        return localStorage.getItem("authToken");
    }

    /**
     * Removes the JWT token from local storage, effectively logging the user out.
     */
    static logout(): void {
        localStorage.removeItem("authToken");
    }

    /**
     * Checks if a user is authenticated by verifying if a valid token exists.
     * @returns Boolean indicating whether the user is authenticated.
     */
    static isAuthenticated(): boolean {
        const token = this.getToken();
        return token !== null; // If token exists, user is considered logged in
    }

    /**
     * Validates the JWT token by sending it to the backend.
     * Useful for verifying if the token is still valid and not expired.
     * @returns A promise resolving to a boolean indicating token validity.
     */
    static async validateToken(): Promise<boolean> {
        try {
            const token = this.getToken();
            if (!token) return false;

            // Send a request to the backend to validate the token
            await axios.get(`${this.apiUrl}/validate-token`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return true; // If request succeeds, token is valid
        } catch (error) {
            // If validation fails (e.g., token expired), return false
            this.logout(); // Remove the invalid token
            return false;
        }
    }
}