import React from "react";
import Header from '../components/Header';
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const LoginContainer = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = () => {
        login().then(() => {
            navigate("/search");
        });
    };
    return (
        <>
            <Header />
            <div>
                <h1> Login Page</h1>
                <button onClick={handleLogin}>Log in</button>
            </div>
        </>
    );
}

export default LoginContainer;
