import { useState, useEffect } from 'react';
import './ManageTeam.scss'
import axios from 'axios';
import { IconButton, Button, CircularProgress, Modal, Select, MenuItem, Alert } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AccountMemberDelet from './AccountMemberDelet';

export default function ManageTeam({ count, account, getAccounts }) {
    const [team, setTeam] = useState()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [accounts, setAccounts] = useState([])
    const [alert, setAlert] = useState({ success: false, msg: '' })

    useEffect(() => {
        getAccountsSelect()
    }, [])

    const getTeam = async () => {
        setLoading(true)
        await axios.put('/team_get', { id: account.id })
            .then(res => {
                setTeam(res.data.users)
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getAccountsSelect = async () => {
        setLoading(true);
        await axios.get('/account_get')
            .then(res => {
                setAccounts(res.data.accounts);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const changeRole = async (member, role) => {
        const account_history = {
            user_id: member.id,
            account_id: account.id,
            action: `Role changed to ${role}`,
        }

        await axios.put('/account_history_create', { account_history })
            .then(res => {
                updateUser(member, role)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const changeTeam = async (member, team) => {
        const account_history = {
            user_id: member.id,
            account_id: account.id,
            action: `Team changed to ${team}`,
        }

        await axios.put('/account_history_create', { account_history })
            .then(res => {
                updateAccountUser(member, team)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const updateUser = async (member, role) => {
        const newUser = {
            id: member.id,
            account_rol: role
        }

        await axios.put('/user_update', { newUser })
            .then(res => {
                setAlert({ success: true, msg: `Member ${member.username} updated successfully` })
                getTeam()
                setTimeout(() => {
                    setAlert({ success: false, msg: '' })
                }, 3000)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const updateAccountUser = async (member, team) => {
        const newUser = {
            id: member.id,
            account_id: team
        }

        await axios.put('/user_update', { newUser })
            .then(res => {
                setAlert({ success: true, msg: `Member ${member.username} account updated successfully` })
                getTeam()
                setTimeout(() => {
                    setAlert({ success: false, msg: '' })
                    getAccounts()
                }, 3000)
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <>
            <Button
                aria-label="expand row"
                size="small"
                // onClick={() => setOpen(!open)}
                onClick={() => (getTeam(), setOpen(!open))}
                color='primary'
                className={count === 0 ? '' : 'manageTeamButton'}
                disabled={count === 0}
            >
                {count}
            </Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='manageTeamModalContainer'
            >
                <div className='manageTeamModal'>
                    <Alert
                        severity={alert.success ? 'success' : 'error'}
                        className='manageTeamAlert'
                        sx={{ display: alert.msg ? 'flex' : 'none' }}
                    >
                        {alert.msg}
                    </Alert>
                    <div className='manageTeamModalHeader'>
                        <h1>Team Members Managment</h1>
                    </div>
                    <div className='manageTeamTableContainer'>
                        <TableContainer className='tableContainerMuiManageTeam'>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className='manageTeamTableHeader'>Name</TableCell>
                                        <TableCell className='manageTeamTableHeader'>E-Mail</TableCell>
                                        <TableCell className='manageTeamTableHeader' align='center'>Role</TableCell>
                                        <TableCell className='manageTeamTableHeader' align='center'>Team</TableCell>
                                        <TableCell className='manageTeamTableHeader'></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        loading
                                            ? <TableRow>
                                                <TableCell colSpan={5} align='center'>
                                                    <CircularProgress sx={{ color: 'black' }} />
                                                </TableCell>
                                            </TableRow>
                                            : team && team.map((member) => (
                                                <TableRow key={member.id}>
                                                    <TableCell>{member.username}</TableCell>
                                                    <TableCell>{member.email}</TableCell>
                                                    <TableCell sx={{ padding: '0px' }} align='center'>
                                                        <Select
                                                            value={member.account_rol}
                                                            onChange={(e) => changeRole(member, e.target.value)}
                                                            sx={{ width: '100%' }}
                                                            size='small'
                                                        >
                                                            <MenuItem value='Manager'>Manager</MenuItem>
                                                            <MenuItem value='Lead'>Lead</MenuItem>
                                                            <MenuItem value='Team'>Team</MenuItem>
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell sx={{ padding: '0px 9px' }} align='center'>
                                                        <Select
                                                            value={member.account_id}
                                                            onChange={(e) => changeTeam(member, e.target.value)}
                                                            sx={{ width: '100%' }}
                                                            size='small'
                                                        >
                                                            {
                                                                accounts.map((account, index) => (
                                                                    <MenuItem
                                                                        key={index}
                                                                        value={account.id}
                                                                    >
                                                                        {account.account_name}
                                                                    </MenuItem>
                                                                ))
                                                            }
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell align='center' sx={{ padding: '0px' }}>
                                                        <AccountMemberDelet account={account} user={member} getTeam={getTeam} />
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </Modal>
        </>
    )
}