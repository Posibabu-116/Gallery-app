import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Welcome = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/gallery"); // Redirect to Gallery page after 3 seconds
        }, 3000);
    }, [navigate]);

    return (
        <div className="welcome-container">
            <h1>Welcome! 🎉</h1>
            <p>Redirecting to gallery...</p>
        </div>
    );
};

export default Welcome;
