import React, { useState } from "react";
import { AuthService } from "../services/AuthService.tsx";
import styles from "../authentication/login.module.css";

const Login: React.FC = () => {
    // State for Login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    // State for Registration
    const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [registerMessage, setRegisterMessage] = useState("");

    // Handle Login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("Logging in...");

        const response = await AuthService.login(email, password);

        if (response.success) {
            AuthService.saveToken(response.token || ""); // ✅ Save token if using JWT
            setMessage("Login successful! Redirecting...");
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 1000);
        } else {
            setMessage(response.error || "Login failed. Please try again.");
        }
    };

    // Handle Registration
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setRegisterMessage("Registering...");

        const response = await AuthService.register(name, email, password, phoneNumber);

        if (response.success) {
            setRegisterMessage("Registration successful! Redirecting to login...");
            setTimeout(() => {
                setIsRegistering(false); // Switch back to login mode
            }, 1000);
        } else {
            setRegisterMessage(response.error || "Registration failed. Please try again.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.authBox}>
                <h2 className={styles.title}>{isRegistering ? "Register" : "Login"}</h2>

                {isRegistering ? (
                    <form onSubmit={handleRegister} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Full Name:</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email:</label>
                            <input
                                type="email"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Password:</label>
                            <input
                                type="password"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Phone Number:</label>
                            <input
                                type="tel"
                                className={styles.input}
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <button className={styles.button} type="submit">Register</button>
                        <p className={styles.message}>{registerMessage}</p>
                    </form>
                ) : (
                    <form onSubmit={handleLogin} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email:</label>
                            <input
                                type="email"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Password:</label>
                            <input
                                type="password"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className={styles.button} type="submit">Login</button>
                        <p className={styles.message}>{message}</p>
                    </form>
                )}

                {/* Toggle Button */}
                <button className={styles.toggleButton} onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
                </button>
            </div>
        </div>
    );
};

export default Login;