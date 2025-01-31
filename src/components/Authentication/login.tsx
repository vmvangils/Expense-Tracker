import React, { useState, useEffect } from "react";
import { AuthService } from "../services/AuthService.tsx";
import styles from "../authentication/login.module.css";

const Login: React.FC = () => {
    // User Authentication State
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(AuthService.isAuthenticated());
    const [user, setUser] = useState<{ name: string } | null>(null);

    // Login State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    // Registration State
    const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [registerMessage, setRegisterMessage] = useState("");

    // ✅ Fetch User Details on Load (if logged in)
    useEffect(() => {
        const fetchUser = async () => {
            if (isAuthenticated) {
                const response = await AuthService.getUser();
                if (response.success && response.user) {
                    setUser(response.user);
                } else {
                    AuthService.logout();
                    setIsAuthenticated(false);
                }
            }
        };
        fetchUser();
    }, [isAuthenticated]);

    // ✅ Handle Login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("Logging in...");

        const response = await AuthService.login(email, password);

        if (response.success) {
            setMessage("Login successful! Redirecting...");
            setIsAuthenticated(true);
            setTimeout(() => (window.location.href = "/dashboard"), 1000);
        } else {
            setMessage(response.error || "Login failed. Please try again.");
        }
    };

    // ✅ Handle Registration
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setRegisterMessage("Registering...");

        const response = await AuthService.register(name, email, password, phoneNumber);

        if (response.success) {
            setRegisterMessage("Registration successful! Redirecting to login...");
            setTimeout(() => setIsRegistering(false), 1000);
        } else {
            setRegisterMessage(response.error || "Registration failed. Please try again.");
        }
    };

    // ✅ Handle Logout
    const handleLogout = () => {
        AuthService.logout();
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.authBox}>
                {/* ✅ If logged in, show welcome message & logout */}
                {isAuthenticated && user ? (
                    <div className={styles.loggedInBox}>
                        <h2 className={styles.title}>Welcome, {user.name}!</h2>
                        <button className={styles.logoutButton} onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
