import { useState } from 'react';
import './ChangeStatusUser.scss';
import axios from 'axios';
import { Modal, Button } from '@mui/material';

export default function ChangeStatusUser({ user, getUsers }) {
    const [open, setOpen] = useState(false);

    const handleChangeUserStatus = async () => {
        user.deletedAt
            ? await axios.put(`/user_activate/${user.id}`)
                .then(res => {
                    getUsers();
                })
                .catch(err => {
                    console.log(err);
                })
            : await axios.delete(`/user_deactivate/${user.id}`)
                .then(res => {
                    getUsers();
                })
                .catch(err => {
                    console.log(err);
                })
    }

    return (
        <>
            <Button
                color={user.deletedAt ? 'error' : 'success'}
                variant='outlined'
                onClick={() => { setOpen(true) }}
                size='small'
            >
                {
                    user.deletedAt
                        ? 'Inactive'
                        : 'Active'
                }
            </Button>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
                className='modalChangeStatusUserContainer'
            >
                <div className='modalChangeStatusUserCard'>
                    <div className='changeStatusUserTitleContainer'>
                        <p className='changeStatusUserTitle'>
                            Are you sure you want to
                            <b className={user.deletedAt ? 'changeStatusUserActiveText' : 'changeStatusUserInactiveText'}>
                                {user.deletedAt ? ' Activate ' : ' Inactivate '}
                            </b>
                            this user?
                        </p>
                    </div>
                    <p className='changeStatusUserName'>{user.username}</p>
                    <div className='changeStatusUserButtonsContainer'>
                        <Button
                            size='small'
                            variant='outlined'
                            onClick={() => { setOpen(false) }}
                            color='error'
                        >
                            Cancel
                        </Button>
                        <Button
                            size='small'
                            variant='outlined'
                            onClick={() => { handleChangeUserStatus(); setOpen(false) }}
                            color='success'
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}