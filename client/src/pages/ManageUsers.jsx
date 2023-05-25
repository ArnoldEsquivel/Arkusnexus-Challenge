import './ManageUsers.scss'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateUser from '../components/CreateUser';
import EditUser from '../components/EditUser';
import ChangeStatusUser from '../components/ChangeStatusUser';
import { CircularProgress } from '@mui/material';

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        setLoading(true)
        await axios.get('/user_get')
            .then(res => {
                setUsers(res.data.users);
                setLoading(false)
                console.log(res.data.users);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleTypeUser = (id) => {
        switch (id) {
            case 1:
                return 'Super Admin'
                break;
            case 2:
                return 'Admin'
                break;
            default:
                return 'User'
                break;
        }
    }

    return (
        <div>
            <div className='manageUsersTitleContainer'>
                <h1>Users Managment</h1>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className='tableCellHeaderManageUsers'>
                                Name
                            </TableCell>
                            <TableCell className='tableCellHeaderManageUsers'>
                                E-Mail
                            </TableCell>
                            <TableCell className='tableCellHeaderManageUsers' align='center'>
                                Account
                            </TableCell>
                            <TableCell className='tableCellHeaderManageUsers' align='center'>
                                Rol
                            </TableCell>
                            <TableCell className='tableCellHeaderManageUsers' align='center'>
                                Technicality
                            </TableCell>
                            <TableCell className='tableCellHeaderManageUsers'>
                                English
                            </TableCell>
                            <TableCell className='tableCellHeaderManageUsers' align='center'>
                                Status
                            </TableCell>
                            <TableCell className='tableCellHeaderManageUsers' sx={{ padding: '0px' }}>
                                <CreateUser getUsers={getUsers} />
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
                                : users.map((user, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        className='tableRowBodyManageUsers'
                                    >
                                        <TableCell>
                                            {user.username}
                                        </TableCell>
                                        <TableCell>
                                            {user.email}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {
                                                user.account
                                                ? user.account.account_name
                                                : 'Not Assigned'
                                            }
                                        </TableCell>
                                        <TableCell align='center'>
                                            {handleTypeUser(user.type_id)}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {
                                                user.technicality
                                                    ? user.technicality
                                                    : 'Not Assigned'
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                user.english_level
                                                    ? user.english_level
                                                    : 'Not Assigned'
                                            }
                                        </TableCell>
                                        <TableCell align='center' sx={{ padding: '0px' }}>
                                            <ChangeStatusUser user={user} getUsers={getUsers} />
                                        </TableCell>
                                        <TableCell align='center' sx={{ padding: '0px' }}>
                                            <EditUser user={user} getUsers={getUsers} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}