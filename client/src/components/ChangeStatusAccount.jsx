import { useState } from 'react';
import './ChangeStatusAccount.scss';
import axios from 'axios';
import { Modal, Button } from '@mui/material';

export default function ChangeStatusAccount({ account, getAccounts }) {
    const [open, setOpen] = useState(false);

    const handleChangeAccountStatus = async () => {
        account.deletedAt
            ? await axios.put(`/account_activate/${account.id}`)
                .then(res => {
                    getAccounts();
                })
                .catch(err => {
                    console.log(err);
                })
            : await axios.delete(`/account_deactivate/${account.id}`)
                .then(res => {
                    getAccounts();
                })
                .catch(err => {
                    console.log(err);
                })
    }

    return (
        <>
            <Button
                color={account.deletedAt ? 'error' : 'success'}
                variant='outlined'
                onClick={() => { setOpen(true) }}
                size='small'
            >
                {
                    account.deletedAt
                        ? 'Inactive'
                        : 'Active'
                }
            </Button>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
                className='modalChangeStatusAccountContainer'
            >
                <div className='modalChangeStatusAccountCard'>
                    <div className='changeStatusAccountTitleContainer'>
                        <p className='changeStatusAccountTitle'>
                            Are you sure you want to
                            <b className={account.deletedAt ? 'changeStatusAcountActiveText' : 'changeStatusAcountInactiveText'}>
                                {account.deletedAt ? ' Activate ' : ' Inactivate '}
                            </b>
                            this account?
                        </p>
                    </div>
                    <p className='changeStatusAccountName'>{account.account_name} from {account.client_name}</p>
                    <div className='changeStatusAccountButtonsContainer'>
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
                            onClick={() => { handleChangeAccountStatus(); setOpen(false) }}
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