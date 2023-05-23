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
import ManagerAccount from '../components/ManagerAccount';
import CountTeamMembers from '../components/CountTeamMembers';
import ChangeStatusAccount from '../components/ChangeStatusAccount';
import EditAccount from '../components/EditAccount';

export default function ManageAccounts() {
    const [account, setAccount] = useState({
        account_name: '',
        client_name: '',
    })
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.put('/account_create', { account })
            .then(res => {
                setAccount({
                    account_name: '',
                    client_name: '',
                })
                getAccounts();
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
        <div>
            <form>
                <TextField
                    label="Account Name"
                    placeholder="Arkusnexus"
                    name="account_name"
                    value={account.account_name}
                    onChange={handleAccount}
                    size='small'
                    InputLabelProps={
                        { shrink: true }
                    }
                />
                <TextField
                    label="Client Name"
                    placeholder="Mind"
                    name="client_name"
                    value={account.client_name}
                    onChange={handleAccount}
                    size='small'
                    InputLabelProps={
                        { shrink: true }
                    }
                />
                <Button
                    variant="outlined"
                    color="success"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Create Account
                </Button>
            </form>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Client</TableCell>
                            <TableCell>Manager</TableCell>
                            <TableCell align='center'>Team Members</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell align='center'>Status</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            loading
                                ? <TableRow >
                                    <TableCell>Loading...</TableCell>
                                </TableRow>
                                : accounts && accounts.map((account, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
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
                                            {<CountTeamMembers id={account.id} />}
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
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}