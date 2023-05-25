import { useState } from 'react';
import './EditAccount.scss';
import axios from 'axios';
import { TextField, IconButton, Button, Modal, Alert, CircularProgress } from '@mui/material';
import { FiEdit3 } from 'react-icons/fi';

export default function EditAccount({ account, getAccounts }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ success: false, msg: '' });
    const [accountUpdate, setAccountUpdate] = useState({
        id: account.id,
        account_name: account.account_name,
        client_name: account.client_name
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await axios.put('/account_update', { accountUpdate })
            .then(res => {
                setAlert({ success: true, msg: 'Account updated successfully' });
                setOpen(false);
                setLoading(false);
                setTimeout(() => {
                    setAlert({ success: false, msg: '' });
                    getAccounts();
                }, 3000)
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                setAlert({ success: false, msg: 'Error updating account, please try again later' });
                setTimeout(() => {
                    setAlert({ success: false, msg: '' });
                    getAccounts();
                }, 3000)
            })
    }

    const handleAccount = (event) => {
        setAccountUpdate({
            ...accountUpdate,
            [event.target.name]: event.target.value
        })
    }

    return (
        <>
            <Alert
                variant='filled'
                className='alertEditAccount'
                severity={alert.success ? 'success' : 'error'}
                style={{ display: alert.msg ? 'flex' : 'none' }}
            >
                {alert.msg}
            </Alert>
            <IconButton
                color='success'
                size='small'
                onClick={() => { setOpen(true) }}
            >
                <FiEdit3 />
            </IconButton>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
                className='modalEditAccountContainer'
            >
                <div className='modalEditAccountCard'>
                    <div className='modalEditAccountTitleContainer'>
                        <p>Edit Account <b>{account.account_name}</b></p>
                    </div>
                    <form className='modalEditAccountForm'>
                        <p>Account Name</p>
                        <TextField
                            className='modalEditAccountTextField'
                            placeholder="Arkusnexus"
                            name="account_name"
                            value={accountUpdate.account_name}
                            // defaultValue={account.account_name}
                            onChange={handleAccount}
                            size='small'
                            InputLabelProps={
                                { shrink: true }
                            }
                            variant="outlined"
                        />
                        <p>Client Name</p>
                        <TextField
                            className='modalEditAccountTextField'
                            placeholder="Mind"
                            name="client_name"
                            value={accountUpdate.client_name}
                            onChange={handleAccount}
                            size='small'
                            InputLabelProps={
                                { shrink: true }
                            }
                            variant="outlined"
                        />
                        <div className='modalEditAccountButtons'>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => { setOpen(false) }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                {
                                    loading
                                        ? <CircularProgress size={20} color='success' />
                                        : 'Apply'
                                }
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}