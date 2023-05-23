import { useState, useEffect } from 'react'
import './CreateUser.scss'
import axios from 'axios';
import { Button, TextField, IconButton, InputAdornment, Select, MenuItem, Alert, Modal, CircularProgress } from '@mui/material';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

export default function CreateUser() {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ success: false, msg: '' });
    const [loading, setLoading] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({
        boolean: false,
        msg: ''
    });
    const [emailError, setEmailError] = useState({
        boolean: false,
        msg: ''
    });
    const [user, setUser] = useState({
        username: '',
        password: '',
        email: '',
        account_id: 0,
        technicality: '',
        cv_link: '',
        type_id: 0,
        english_level: 0
    })

    useEffect(() => {
        getAccounts();
    }, [])

    const getAccounts = async () => {
        setLoading(true);
        await axios.get('/account_get')
            .then(res => {
                setAccounts(res.data.accounts);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleUser = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const validatePassword = (value) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[\w!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;
        if (!passwordRegex.test(value)) {
            setError({
                boolean: true,
                msg: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'
            });
        } else {
            setError({
                boolean: false,
                msg: ''
            });
        }
    };

    const validateEmail = (value) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(value)) {
            setEmailError({
                boolean: true,
                msg: 'Invalid email'
            });
        } else {
            setEmailError({
                boolean: false,
                msg: ''
            });
        }
    };


    const handlePasswordChange = (event) => {
        validatePassword(event.target.value);
        setUser({
            ...user,
            password: event.target.value
        })
    };

    const handleEmailChange = (event) => {
        validateEmail(event.target.value);
        setUser({
            ...user,
            email: event.target.value
        })
    };

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        await axios.put('/user_create', { user })
            .then(res => {
                setAlert({ success: true, msg: res.data.message });
                setUser({
                    username: '',
                    password: '',
                    email: '',
                    account_id: 0,
                    type_id: 0
                })
                setOpen(false);
                setLoading(false);
                setTimeout(() => {
                    setAlert({ success: false, msg: '' });
                }, 3000);
            })
            .catch(err => {
                setLoading(false);
                setAlert({ success: false, msg: err.response.data.msg });
            })
    }

    return (
        <>
            <Alert
                variant='filled'
                severity={alert.success ? 'success' : 'error'}
                sx={{ display: alert.msg ? 'flex' : 'none' }}
                className='alertCreateUser'
            >
                {alert.msg}
            </Alert>
            <Button
                variant='contained'
                color='success'
                onClick={() => { setOpen(true) }}
            >
                Create User
            </Button>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='modalCreateUserMainContainer'
            >
                <div className='modalCreateUser'>
                    <div className='modalCreateUserTitleContainer'>
                        <p>Create User</p>
                    </div>
                    <div className='modalCreateUserFormContainer'>
                        <form
                            className='modalCreateUserForm'
                            onSubmit={handleSubmit}
                        >
                            <p>Name</p>
                            <TextField
                                size='small'
                                className='textFieldCreateUser'
                                placeholder='John Doe'
                                name='username'
                                defaultValue={user.username}
                                onChange={handleUser}
                                required
                            />
                            <p>Password</p>
                            <TextField
                                size='small'
                                className='textFieldCreateUser'
                                placeholder='Password'
                                name='password'
                                defaultValue={user.password}
                                onChange={handlePasswordChange}
                                required
                                error={error.boolean}
                                helperText={error.msg}
                                type={showPassword ? 'text' : 'password'}
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
                            <p>Email</p>
                            <TextField
                                size='small'
                                className='textFieldCreateUser'
                                placeholder='jonh_doe@example.com'
                                name='email'
                                defaultValue={user.email}
                                onChange={handleEmailChange}
                                required
                                error={emailError.boolean}
                                helperText={emailError.msg}
                                type='email'
                            />
                            <p>Technical Speciality</p>
                            <TextField
                                size='small'
                                className='textFieldCreateUser'
                                placeholder='Developer Full Stack'
                                name='technicality'
                                defaultValue={user.technicality}
                                onChange={handleEmailChange}
                                required
                            />
                            <p>CV Link</p>
                            <TextField
                                size='small'
                                className='textFieldCreateUser'
                                placeholder='www.google.com/docs/cv'
                                name='cv_link'
                                defaultValue={user.cv_link}
                                onChange={handleEmailChange}
                                required
                            />
                            <p>Type User</p>
                            <Select
                                size='small'
                                className='selectCreateUser'
                                variant='outlined'
                                name='type_id'
                                defaultValue={user.type_id}
                                onChange={handleUser}
                                required
                            >
                                <MenuItem value={0}><em>Select Type</em></MenuItem>
                                <MenuItem value={1}>Super Admin</MenuItem>
                                <MenuItem value={2}>Admin</MenuItem>
                                <MenuItem value={3}>User</MenuItem>
                            </Select>
                            <p>English Level</p>
                            <Select
                                size='small'
                                className='selectCreateUser'
                                variant='outlined'
                                name='english_leve'
                                defaultValue={user.english_level}
                                onChange={handleUser}
                                required
                            >
                                <MenuItem value={0}><em>Select Level</em></MenuItem>
                                <MenuItem value={1}>A1</MenuItem>
                                <MenuItem value={2}>A2</MenuItem>
                                <MenuItem value={3}>B1</MenuItem>
                                <MenuItem value={4}>B2</MenuItem>
                                <MenuItem value={5}>C1</MenuItem>
                                <MenuItem value={6}>C2</MenuItem>
                            </Select>
                            <p>Account</p>
                            <Select
                                size='small'
                                className='selectCreateUser'
                                variant='outlined'
                                name='account_id'
                                defaultValue={user.account_id}
                                onChange={handleUser}
                            >
                                <MenuItem value={0}><em>Select Account</em></MenuItem>
                                {accounts.map(account => {
                                    return (
                                        <MenuItem
                                            key={account.id}
                                            value={account.id}
                                        >
                                            {account.account_name}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                            <div className='modalCreateUserButtonsContainer'>
                                <Button
                                    variant='contained'
                                    color='error'
                                    onClick={() => { setOpen(false) }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant='contained'
                                    color='success'
                                    type='submit'
                                >
                                    {
                                        loading
                                            ? <CircularProgress size={24} color='success' />
                                            : 'Create'
                                    }
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    )
}