import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

export default function Login() {
    const { login } = useAuthContext();

    const handleLogin = () => {
        login();
    }

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}