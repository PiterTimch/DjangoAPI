import './App.css'
import { useEffect, useState } from "react";
import axios from "axios";
import type { IUserItem } from "./types/users/IUserItem.ts";

function App() {
    const [users, setUsers] = useState<Array<IUserItem>>([]);

    const loadList = async () => {
        try {
            const res = await axios<IUserItem[]>('http://127.0.0.1:9581/api/users/');
            setUsers(res.data);
        }
        catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        loadList();
    }, []);

    return (
        <>
            <h1>Users</h1>
            <table className="user-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Імʼя</th>
                    <th>Прізвище</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default App
