import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

export default function Login() {
    const { login } = useAuthContext();

    const handleLogin = () => {
        login();
    }

    //Maquetado del Login

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}