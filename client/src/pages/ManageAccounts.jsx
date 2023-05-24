import { useState, useEffect } from 'react'
import './ManageAccounts.scss'
import axios from 'axios';
import { TextField, Button, Modal } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Collapse, Box, CircularProgress } from '@mui/material';
import ManagerAccount from '../components/ManagerAccount';
import CountTeamMembers from '../components/CountTeamMembers';
import ChangeStatusAccount from '../components/ChangeStatusAccount';
import EditAccount from '../components/EditAccount';
import CreateAccount from '../components/CreateAccount';
import ManageTeam from '../components/ManageTeam';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { AiOutlineArrowUp } from 'react-icons/ai';


function Row({ account, getAccounts }) {
    const [open, setOpen] = useState(false);
    const [history, setHistory] = useState([]);
    const [createdBy, setCreatedBy] = useState('')
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState()

    useEffect(() => {
        getHistory()
        getCreatedBy()
        getCount()
    }, [])

    const getHistory = async () => {
        setLoading(true)
        await axios.get('/account_history_get', { id: account.id })
            .then(res => {
                setHistory(res.data.history);
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
            })
    }

    const getCreatedBy = async () => {
        await axios.put('/get_manager_account', { id: account.created_by })
            .then(res => {
                setCreatedBy(res.data.manager.username)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getCount = async () => {
        await axios.put('/team_members_count', { id: account.id })
            .then(res => {
                setCount(res.data.count);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {account.account_name}
                </TableCell>
                <TableCell>
                    {account.client_name}
                </TableCell>
                <TableCell>
                    {
                        account.operation_manager
                            ? <ManagerAccount id={account.operation_manager} />
                            : 'Not Assigned'
                    }
                </TableCell>
                <TableCell align='center'>
                    {<ManageTeam count={count} account={account} />}
                </TableCell>
                <TableCell>
                    {account.createdAt.slice(0, 10)}
                </TableCell>
                <TableCell align='center'>
                    {<ChangeStatusAccount account={account} getAccounts={getAccounts} />}
                </TableCell>
                <TableCell align='center'>
                    {<EditAccount account={account} getAccounts={getAccounts} />}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <div className='accountsHistoryTitleContainer'>
                                <p>{account.account_name}</p>
                                <span>Created by <b>{createdBy}</b> on <b>{account.createdAt.slice(0, 10)}</b></span>
                            </div>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))} */}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

export default function ManageAccounts() {
    const [account, setAccount] = useState({
        account_name: '',
        client_name: '',
    })
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        id: 3,
    }); //Crear sesion para obtener el id del usuario logueado

    useEffect(() => {
        getAccounts()
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

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Name</TableCell>
                            <TableCell>Client</TableCell>
                            <TableCell>Manager</TableCell>
                            <TableCell align='center'>Team Members</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell align='center'>Status</TableCell>
                            <TableCell sx={{ padding: '0px' }}>
                                <CreateAccount user={user} getAccounts={getAccounts} />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            loading
                                ? <TableRow >
                                    <TableCell>Loading...</TableCell>
                                </TableRow>
                                : accounts && accounts.map((account, index) => (
                                    <Row key={index} account={account} />
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}