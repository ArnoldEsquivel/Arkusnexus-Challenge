import { useState, useEffect } from 'react'
import axios from 'axios';

export default function ManagerAccount(id) {
    const [manager, setManager] = useState({})

    useEffect(() => {
        getManager()
    }, [])

    const getManager = async () => {
        await axios.put('/get_manager_account', { id })
            .then(res => {
                setManager(res.data.manager);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <span>{manager && manager}</span>
    )
}