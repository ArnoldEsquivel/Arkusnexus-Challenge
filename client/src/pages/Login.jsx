import './Login.scss'
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { TextField, IconButton, InputAdornment, Button } from '@mui/material';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuthContext();

    const handleLogin = () => {
        login();
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="loginPageMainContainer">
            <div className="loginFormMainContainer">
                <h1>ADMOON</h1>
                <div className="loginFormCardContainer">
                    <form className='formStyle'>
                        <p>E-Mail</p>
                        <TextField
                            id="email"
                            placeholder="jonh@doe.com"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            fullWidth
                        />
                        <p>Password</p>
                        <TextField
                            id="password"
                            placeholder="********"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePasswordVisibility}>
                                            {
                                                showPassword
                                                    ? <AiOutlineEye className='iconPassword' />
                                                    : <AiOutlineEyeInvisible className='iconPassword' />
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            className='loginButton'
                            type="submit"
                            onClick={handleLogin}
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}