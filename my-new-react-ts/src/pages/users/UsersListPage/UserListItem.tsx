import type {IUserItem} from "../../../types/users/IUserItem";
import {APP_ENV} from "../../../env";

interface Props {
    user: IUserItem;
}

const UserListItem: React.FC<Props> = ({user}) => {
    return (
        <>
            <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <th scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {user.id}
                </th>
                <td className="px-6 py-4">
                    <img src={APP_ENV.IMAGE_BASE_URL + user.image_small} alt="avatar" className="w-10 h-10 rounded-full object-cover"/>
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {user.last_name} {user.first_name}
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {user.email}
                </td>
                <td className="px-6 py-4">

                </td>
            </tr>
        </>
    )
}

export default UserListItem;