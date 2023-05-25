import { useState, useEffect } from 'react';
import './ResetPassword.scss'
import axios from 'axios';
import { Button, Modal, Alert, TextField, CircularProgress } from '@mui/material';

export default function ResetPassword({ user }) {
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        success: false,
        msg: ''
    });

    const handleResetPassword = async () => {
        setLoading(true)
        await axios.put('/user_reset_password', { password, id: user.id })
            .then(res => {
                setAlert({
                    success: true,
                    msg: 'Password reset successfully'
                })
                setTimeout(() => {
                    setOpen(false)
                    setLoading(false)
                    setAlert({
                        success: false,
                        msg: ''
                    })
                }, 3000)
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <>
            <Button
                variant="outlined"
                onClick={() => setOpen(true)}
                size='small'
                color='error'
            >
                Reset
            </Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='modalResetPassword'
            >
                <div className='modalResetPasswordContainer'>
                    <Alert
                        severity={alert.success ? 'success' : 'error'}
                        sx={{ display: alert.msg ? 'flex' : 'none' }}
                        className='modalResetPasswordAlert'
                    >
                        {alert.msg}
                    </Alert>
                    <div className='modalResetPasswordTitleContainer'>
                        <h1>Reset Password</h1>
                    </div>
                    <div className='modalResetPasswordInputContainer'>
                        <p>New Password</p>
                        <TextField
                            size='small'
                            id="outlined-basic"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='modalResetPasswordInput'
                        />
                    </div>
                    <div className='modalResetPasswordButtonContainer'>
                        <Button
                            variant="contained"
                            onClick={() => setOpen(false)}
                            color='error'
                        >
                            Cancel
                        </Button>
                        <Button
                            color='success'
                            variant="contained"
                            onClick={() => handleResetPassword()}
                            disabled={loading}
                        >
                            {
                                loading
                                    ? <CircularProgress size={20} color='inherit' />
                                    : 'Reset'
                            }
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}