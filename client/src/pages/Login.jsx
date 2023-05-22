import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

export default function Login() {
    const { login } = useAuthContext();

    const handleLogin = () => {
        login();
    }

    //Maquetado del Login

    return (
        <div className="loginPageMainContainer">
        </div>
    )
}