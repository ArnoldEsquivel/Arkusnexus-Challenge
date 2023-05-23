import { useState, useEffect } from 'react'
import axios from 'axios';

export default function CountTeamMembers(id) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        getCount()
    }, [])

    const getCount = async () => {
        await axios.put('/team_members_count', { id })
            .then(res => {
                setCount(res.data.count);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <span>{count && count}</span>
    )
}