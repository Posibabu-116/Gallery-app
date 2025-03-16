import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "../App.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");

        if (!username || !password) {
            setError("Please enter a valid username and password!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/users/login", {
                username,
                password,
            });

            localStorage.setItem("token", response.data.token);
            alert("Login successful!");
            navigate("/welcome");
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>} 

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <div className="password-input">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="icon-button"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
            <button onClick={handleLogin}>Login</button>
            <p>
                Don't have an account? <a href="/signup">Sign Up</a>
            </p>
        </div>
    );
};

export default Login;
