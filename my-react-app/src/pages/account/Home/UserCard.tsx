import React from "react";
import type { IUserItem } from "../../../types/users/IUserItem";

interface UserRowProps {
    user: IUserItem;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.first_name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.last_name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
        </tr>
    );
};

export default UserRow;
