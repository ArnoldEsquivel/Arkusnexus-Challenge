import { useState, useEffect } from 'react';
import './EditUser.scss';
import axios from 'axios';
import { TextField, IconButton, Button, Modal, Alert, CircularProgress, Select, MenuItem } from '@mui/material';
import { FiEdit3 } from 'react-icons/fi';


export default function EditUser({ user, getUsers }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ success: false, message: '' });
    const [newUser, setNewUser] = useState({
        id: user.id,
        username: user.username,
        password: user.password,
        email: user.email
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.put('/user_update', { newUser })
            .then(res => {
                setAlert({ success: true, message: res.data.message });
                setLoading(false);
                setOpen(false);
                setTimeout(() => {
                    setAlert({ success: false, message: '' });
                    getUsers();
                }, 3000);
            })
            .catch(err => {
                console.log(err);
                setAlert({ success: false, message: err.response.data.message });
                setLoading(false);
                setOpen(false);
                setTimeout(() => {
                    setAlert({ success: false, message: '' });
                }, 3000);
            })
    }

    return (
        <>
            <Alert
                variant='filled'
                className='alertEditUser'
                severity={alert.success ? 'success' : 'error'}
                style={{ display: alert.message ? 'flex' : 'none' }}
            >
                {alert.message}
            </Alert>
            <IconButton
                color='success'
                // size='small'
                onClick={() => { setOpen(true) }}
            >
                <FiEdit3 />
            </IconButton>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='modalEditUser'
            >
                <div className='modalEditUserContainer'>
                    <div className='modalEditUSerTitleContainer'>
                        <p>Edit User</p>
                    </div>
                    <form onSubmit={handleSubmit} className='modalEditUserForm'>
                        <p>Username</p>
                        <TextField
                            variant='outlined'
                            size='small'
                            defaultValue={user.username}
                            onChange={(e) => { setNewUser({ ...newUser, username: e.target.value }) }}
                            className='textFieldUserEdit'
                        />
                        <p>E-Mail</p>
                        <TextField
                            variant='outlined'
                            size='small'
                            defaultValue={user.email}
                            onChange={(e) => { setNewUser({ ...newUser, email: e.target.value }) }}
                            className='textFieldUserEdit'
                        />
                        <p>English Level</p>
                        <Select
                            variant='outlined'
                            size='small'
                            defaultValue={user.english_level != null ? user.english_level : 0}
                            onChange={(e) => { setNewUser({ ...newUser, english_level: e.target.value }) }}
                            className='selectUserEdit'
                        >
                            <MenuItem value={0}>Not Assigned</MenuItem>
                            <MenuItem value={'A1'}>A1</MenuItem>
                            <MenuItem value={'A2'}>A2</MenuItem>
                            <MenuItem value={'B1'}>B1</MenuItem>
                            <MenuItem value={'B2'}>B2</MenuItem>
                            <MenuItem value={'C1'}>C1</MenuItem>
                            <MenuItem value={'C2'}>C2</MenuItem>
                        </Select>
                        <p>Type User</p>
                        <Select
                            variant='outlined'
                            size='small'
                            defaultValue={user.type_id}
                            onChange={(e) => { setNewUser({ ...newUser, type_id: e.target.value }) }}
                            className='selectUserEdit'
                        >
                            <MenuItem value={1}>Super Admin</MenuItem>
                            <MenuItem value={2}>Admin</MenuItem>
                            <MenuItem value={3}>User</MenuItem>
                        </Select>
                        <div className='modalEditUserButtons'>
                            <Button
                                variant='outlined'
                                color='error'
                                onClick={() => { setOpen(false) }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant='outlined'
                                color='success'
                                type='submit'
                            >
                                {loading ? <CircularProgress size={20} color='success'/> : 'Apply'}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}