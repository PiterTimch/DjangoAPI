import React from "react";
import type { IUserItem } from "../../../types/users/IUserItem";
import { useGetUsersQuery } from "../../../services/useeService.ts";
import UserRow from "./UserCard.tsx";

const HomePage: React.FC = () => {
    const { data: users, isLoading } = useGetUsersQuery();

    return (
        <>
            {isLoading && <div>Loading...</div>}

            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Users</h1>

                <div className="overflow-x-auto rounded-lg shadow-md">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Імʼя</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Прізвище</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {users?.map((user: IUserItem) => (
                            <UserRow key={user.id} user={user} />
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default HomePage;
