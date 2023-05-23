import { useState, useEffect } from 'react'
import './CreateUser.scss'
import axios from 'axios';
import { Button, TextField, IconButton, Typography, Alert, Modal } from '@mui/material';
import { AiOutlineCloseCircle } from 'react-icons/ai'

export default function CreateUser() {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ success: false, msg: '' });
    const [textModal, setTextModal] = useState('');
    const [user, setUser] = useState({
        username: '',
        password: '',
        email: '',
        account_id: null,
        type_id: 3
    })

    const handleUser = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>
            <Alert
                // action={
                //     <IconButton
                //         onClick={() => { setOpenConf(false) }}
                //     >
                //         <AiOutlineCloseCircle />
                //     </IconButton>
                // }
                severity={alert.success ? 'success' : 'error'}
                hidden={!alert.msg}
                variant='outlined'
            >
                {alert.msg}
            </Alert>

        </div>
    )
}