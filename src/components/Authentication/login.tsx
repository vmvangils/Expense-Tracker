import React, { useState } from "react";
import { AuthService } from "../../Services/AuthService.tsx";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("Logging in...");

        const response = await AuthService.login(email, password);

        if (response.success && response.token) {
            AuthService.saveToken(response.token);
            setMessage("Login successful! Redirecting...");

            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 1000);
        } else {
            setMessage(response.error || "Login failed. Please try again.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Updates email state
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Updates password state
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>{message}</p> {/* Feedback message */}
        </div>
    );
};

export default Login;