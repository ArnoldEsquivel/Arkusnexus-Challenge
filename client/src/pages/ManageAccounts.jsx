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
        getCreatedBy()
        getCount()
    }, [])

    const getHistory = async () => {
        setLoading(true)
        await axios.put('/account_history_get', { id: account.id })
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
            <TableRow className='tableRowBodyManageAccounts'>
                <TableCell sx={{ padding: '0px' }} onClick={() => setOpen(!open)}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => (
                            setOpen(!open),
                            open
                                ? null
                                : getHistory()
                        )}
                    >
                        {open ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell onClick={() => setOpen(!open)}>
                    {account.account_name}
                </TableCell>
                <TableCell onClick={() => setOpen(!open)}>
                    {account.client_name}
                </TableCell>
                <TableCell onClick={() => setOpen(!open)}>
                    {
                        account.operation_manager
                            ? <ManagerAccount id={account.operation_manager} />
                            : 'Not Assigned'
                    }
                </TableCell>
                <TableCell align='center' sx={{ padding: '0px' }}>
                    {<ManageTeam count={count} account={account} getAccounts={getAccounts} />}
                </TableCell>
                <TableCell onClick={() => setOpen(!open)}>
                    {account.createdAt.slice(0, 10)}
                </TableCell>
                <TableCell align='center' sx={{ padding: '0px' }}>
                    {<ChangeStatusAccount account={account} getAccounts={getAccounts} />}
                </TableCell>
                <TableCell align='center' sx={{ padding: '0px' }}>
                    {<EditAccount account={account} getAccounts={getAccounts} />}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <div className='accountsHistoryTitleContainer'>
                                <p>{account.account_name}</p>
                                <span>Account created by <b>{createdBy}</b> on <b>{account.createdAt.slice(0, 10)}</b></span>
                            </div>
                            <div className='accountsHistoryTableContainer'>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className='accountHistoryTableCellHeader' align='center'>Date</TableCell>
                                            <TableCell className='accountHistoryTableCellHeader' align='center'>Account</TableCell>
                                            <TableCell className='accountHistoryTableCellHeader' align='center'>Action</TableCell>
                                            <TableCell className='accountHistoryTableCellHeader' align='center'>User</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            loading
                                                ? <TableRow>
                                                    <TableCell colSpan={4} align='center'>
                                                        <CircularProgress sx={{ color: 'black' }} />
                                                    </TableCell>
                                                </TableRow>
                                                : history.length === 0
                                                    ? <TableRow>
                                                        <TableCell colSpan={4} align='center'>
                                                            No history
                                                        </TableCell>
                                                    </TableRow>
                                                    : history.map((historyRow, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell align='center'>
                                                                {historyRow.createdAt.slice(0, 10)}
                                                            </TableCell>
                                                            <TableCell align='center'>
                                                                {historyRow.account.account_name}
                                                            </TableCell>
                                                            <TableCell align='center'>
                                                                {historyRow.action}
                                                            </TableCell>
                                                            <TableCell align='center'>
                                                                {
                                                                    historyRow.user === null
                                                                        ? 'Not Assigned'
                                                                        : historyRow.user.username
                                                                }
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                        }
                                    </TableBody>
                                </Table>
                            </div>
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
    const [rechargeAccounts, setRechargeAccounts] = useState(false);

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
            <div className='accountsManageTitleContainer'>
                <h1>Teams & Accounts Managment</h1>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className='tableCellHeaderManageAccounts' />
                            <TableCell className='tableCellHeaderManageAccounts'>Name</TableCell>
                            <TableCell className='tableCellHeaderManageAccounts'>Client</TableCell>
                            <TableCell className='tableCellHeaderManageAccounts'>Manager</TableCell>
                            <TableCell className='tableCellHeaderManageAccounts' align='center'>Team Members</TableCell>
                            <TableCell className='tableCellHeaderManageAccounts'>Created</TableCell>
                            <TableCell className='tableCellHeaderManageAccounts' align='center'>Status</TableCell>
                            <TableCell className='tableCellHeaderManageAccounts' sx={{ padding: '0px' }}>
                                <CreateAccount user={user} getAccounts={getAccounts} />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            loading
                                ? <TableRow >
                                    <TableCell colSpan={8} align='center'>
                                        <CircularProgress sx={{ color: 'black' }} />
                                    </TableCell>
                                </TableRow>
                                : accounts && accounts.map((account, index) => (
                                    <Row key={index} account={account} getAccounts={getAccounts} />
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}