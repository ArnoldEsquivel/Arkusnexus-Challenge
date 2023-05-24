import { useState } from 'react'
import './CreateAccount.scss'
import axios from 'axios';
import { Button, IconButton, Modal, TextField, Alert, CircularProgress } from '@mui/material';
import { AiOutlinePlusCircle } from 'react-icons/ai';

export default function CreateAccount({ user, getAccounts }) {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ success: false, msg: '' });
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState({
        account_name: '',
        client_name: '',
        created_by: user.id,
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.put('/account_create', { account })
            .then(res => {
                setAlert({ success: true, msg: 'Account created successfully' });
                setAccount({
                    account_name: '',
                    client_name: '',
                })
                setOpen(false);
                setTimeout(() => {
                    setAlert({ success: false, msg: '' });
                    getAccounts();
                }, 3000)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleAccount = (event) => {
        setAccount({
            ...account,
            [event.target.name]: event.target.value
        })
    }

    return (
        <>
            <Alert
                variant='filled'
                className='alertCreateAccount'
                severity={alert.success ? 'success' : 'error'}
                style={{ display: alert.msg ? 'flex' : 'none' }}
            >
                {alert.msg}
            </Alert>
            <Button
                aria-label="create account"
                size="large"
                onClick={() => setOpen(true)}
                color='success'
                sx={{ padding: '0' }}
                fullWidth
            >
                <div className='buttonCreateAccountContainer'>
                    <AiOutlinePlusCircle size='1.8rem'/>
                    <span>Create</span>
                </div>
            </Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='createAccountModal'
            >
                <div className='createAccountModalContainer'>
                    <div className='createAccountTitleContainer'>
                        <p>Create Account</p>
                    </div>
                    <form className='modalCreateAccountForm'>
                        <p>Account Name</p>
                        <TextField
                            size='small'
                            className='createAccountTextField'
                            placeholder="Arkusnexus"
                            name="account_name"
                            value={account.account_name}
                            onChange={handleAccount}
                            InputLabelProps={
                                { shrink: true }
                            }
                        />
                        <p>Client Name</p>
                        <TextField
                            size='small'
                            className='createAccountTextField'
                            placeholder="Mind"
                            name="client_name"
                            value={account.client_name}
                            onChange={handleAccount}
                            InputLabelProps={
                                { shrink: true }
                            }
                        />
                        <div className='createAccountModalButtons'>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="outlined"
                                color="success"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Create Account
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}