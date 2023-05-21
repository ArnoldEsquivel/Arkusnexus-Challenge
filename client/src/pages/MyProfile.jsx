import { useAuthContext } from "../context/AuthContext"

export default function MyProfile() {
    const { logout } = useAuthContext();

    const handleLogout = () => {
        logout()
    }

    return (
        <div>
            <h1>MyProfile</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}