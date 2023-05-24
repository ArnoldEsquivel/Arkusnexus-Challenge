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

export default function ManageUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        await axios.get('/user_get')
            .then(res => {
                setUsers(res.data.users);
                // console.log(res.data.users);
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
            case 3:
                return 'User'
                break;
            default:
                return 'User'
                break;
        }
    }

    return (
        <div>
            <div className='manageUsersCreateUserContainer'>
                <span>Here you can create an new User</span>
                <CreateUser />
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>E-Mail</TableCell>
                            <TableCell>Account</TableCell>
                            <TableCell align='center'>Rol</TableCell>
                            <TableCell>Technicality</TableCell>
                            <TableCell>English</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.username}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.account.account_name}</TableCell>
                                <TableCell align='center'>
                                    {handleTypeUser(user.type_id)}
                                </TableCell>
                                <TableCell>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}