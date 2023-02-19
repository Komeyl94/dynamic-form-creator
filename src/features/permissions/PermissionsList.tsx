import { Button, Table } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deletePermission } from "./permissionsSlice";

const PermissionsList = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.permissions.users);

    const removePermission = (id: string) => {
        dispatch(deletePermission(id));
    }

    if (users) {
        return (<div>
            <Button outline={true} gradientDuoTone="cyanToBlue" className="mb-4" href="/permissions/create">Add User Permission</Button>
            <Table hoverable={true}>
                <Table.Head>
                    <Table.HeadCell>
                        Index
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Name
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">
                            Edit
                        </span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        users.length > 0 ? users.map((user, index) => {
                            return (
                                <Table.Row key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {index + 1}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user.type}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <a
                                            href={`/permissions/edit/${user.id}`}
                                            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                        >
                                            Edit
                                        </a>
                                        <span
                                            onClick={() => removePermission(user.id)}
                                            className="font-medium cursor-pointer mx-2 text-blue-600 hover:underline dark:text-blue-500"
                                        >
                                            Delete
                                        </span>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        }) : <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800"><Table.Cell>No Data</Table.Cell></Table.Row>
                    }
                </Table.Body>
            </Table>
        </div>);
    }
    return (<div>
        <Button outline={true} gradientDuoTone="cyanToBlue" href="/permissions/create">Add User Permission</Button>
        <p>No User Permission Found!</p>
    </div>);
}

export default PermissionsList