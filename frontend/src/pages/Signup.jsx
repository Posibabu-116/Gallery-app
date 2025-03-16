import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        let errors = {};
        if (!formData.email.includes("@")) errors.email = "Invalid email format";
        if (!formData.username.trim()) errors.username = "Username is required";
        if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";
        if (formData.password !== formData.confirmPassword)
            errors.confirmPassword = "Passwords do not match";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async () => {
        if (!validateForm()) return;
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/users/signup", formData);
            alert(response.data.message);
            navigate("/");
        } catch (error) {
            setErrors({ server: error.response?.data?.message || "Something went wrong!" });
        }

        setLoading(false);
    };

    return (
        <div className="form-container">
            <h2>Sign Up</h2>
            {errors.server && <p className="error">{errors.server}</p>}

            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}

            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            {errors.username && <p className="error">{errors.username}</p>}

            <div className="password-input">
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <button type="button" className="icon-button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>

            <button onClick={handleSignup} disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>

            <p>Already have an account? <a href="/">Log In</a></p>
        </div>
    );
};

export default Signup;
