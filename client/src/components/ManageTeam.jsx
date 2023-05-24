import {useState, useEffect} from 'react';
import axios from 'axios';
import { IconButton, Button } from '@mui/material';

export default function ManageTeam({count, account}) {
    const [team, setTeam] = useState([])

    // useEffect(() => {
    //     getTeam()
    // }, [])

    const getTeam = async () => {
        console.log(account.id);
        await axios.put('/team_get', {id: account.id})
            .then(res => {
                setTeam(res.data.team)
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return(
        <>
            <Button
                aria-label="expand row"
                size="small"
                // onClick={() => setOpen(!open)}
                onClick={() => getTeam()}
                color='primary'
                variant='outlined'
                sx={{borderRadius: '50px'}}
            >
                {count}
            </Button>
        </>
    )
}