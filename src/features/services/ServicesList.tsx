import { Button, Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { camelCaseToNormal } from "../../utils/utilities";
import { deleteService } from "./servicesSlice";

const ServicesList = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const list = useAppSelector((state) => state.services.list);

    const removeService = (id: string) => {
        dispatch(deleteService(id));
    }

    if (list) {
        return (
            <div>
                <Button outline={true} gradientDuoTone="cyanToBlue" className="mb-4" onClick={() => navigate("/services/create")}>Add Service</Button>
                <Table hoverable={true}>
                    <Table.Head>
                        <Table.HeadCell>
                            Index
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Name
                        </Table.HeadCell>
                        <Table.HeadCell>
                            URL
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Time
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">
                                Edit
                            </span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            list.length > 0 ? list.map((service, index) => {
                                return (
                                    <Table.Row key={service.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {index + 1}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {service.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {service.url}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {camelCaseToNormal(service.time)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <span
                                                onClick={() => navigate(`/services/edit/${service.id}`)}
                                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                            >
                                                Edit
                                            </span>
                                            <span
                                                onClick={() => removeService(service.id)}
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
            </div>
        );
    }
    return (
        <div>
            <Button outline={true} gradientDuoTone="cyanToBlue" onClick={() => navigate("/services/create")}>Add Service</Button>
            <p>No Service Found!</p>
        </div>
    );
}

export default ServicesList;