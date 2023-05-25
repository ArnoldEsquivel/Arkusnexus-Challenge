import './Login.scss'
import { useState, useEffect } from "react";
import axios from 'axios';
import { useAuthContext } from "../context/AuthContext";
import { TextField, IconButton, InputAdornment, Button, Alert } from '@mui/material';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [alert, setAlert] = useState({success: false, msg: ''});
    const { login } = useAuthContext();

    const handleLogin = async (e) => {
        e.preventDefault();
        // const session = {
        //     user: 'prueba',
        //     token: '123456789'
        // }
        // login(session)
        await axios.put('/user_login', { email, password })
            .then(res => {
            if (res.data.status === 200) {
                console.log(res.data);
                // const session = {
                //     token: res.data.token,
                //     user: res.data.user
                // }
                // login(session);
            } else {
                setAlert({
                    success: false,
                    msg: 'Password or email incorrect'
                })
                setTimeout(() => {
                    setAlert({
                        success: false,
                        msg: ''
                    })
                }, 3000)
            }
        })
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
            <Alert
                severity={alert.success ? 'success' : 'error'}
                sx={{ display: alert.msg ? 'flex' : 'none' }}
                className='modalLoginAlert'
            >
                {alert.msg}
            </Alert>
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