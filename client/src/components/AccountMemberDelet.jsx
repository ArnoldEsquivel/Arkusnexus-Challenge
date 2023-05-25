import { useState, useEffect } from 'react'
import './AccountMemberDelet.scss'
import axios from 'axios';
import { IconButton, TextField, Button, Modal, Alert, Tooltip } from '@mui/material';
import { IoTrashOutline } from 'react-icons/io5'

export default function AccountMemberDelet({ account, user, getTeam }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({ success: false, msg: '' })

    const deleteMember = async () => {
        setLoading(true)
        const account_history = {
            user_id: user.id,
            account_id: account.id,
            action: `Deleted from account ${account.account_name}`
        }

        await axios.put('./account_history_create', { account_history })
            .then(res => {
                updateAccountUser()
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
            })
    }

    const updateAccountUser = async () => {
        const newUser = {
            id: user.id,
            account_id: null,
        }

        await axios.put('/user_update', { newUser })
            .then(res => {
                setAlert({ success: true, msg: `Member ${user.username} deleted from ${account.account_name}` })
                setTimeout(() => {
                    getTeam()
                    setAlert({ success: false, msg: '' })
                }, 3000)
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <Tooltip title='Delete Member from this account' placement='right'>
                <IconButton
                    aria-label="expand row"
                    onClick={() => setOpen(!open)}
                    color='error'
                >
                    <IoTrashOutline />
                </IconButton>
            </Tooltip>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='accountMemberDeleteModalContainer'
            >
                <div className='accountMemberDeleteModal'>
                    <Alert
                        severity={alert.success ? 'success' : 'error'}
                        className='accountMemberDeleteAlert'
                        sx={{ display: alert.msg ? 'flex' : 'none' }}
                    >
                        {alert.msg}
                    </Alert>
                    <div className='accountMemberDeleteTitle'>
                        <h1>Delete Member</h1>
                    </div>
                        <p>Are you sure you want to delete <b>{user.username}</b> from <b>{account.account_name}</b>?</p>
                    <div className='accountMemberDeleteButtons'>
                        <Button
                            variant='contained'
                            color='error'
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            color='success'
                            onClick={() => deleteMember()}
                            disabled={loading}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}