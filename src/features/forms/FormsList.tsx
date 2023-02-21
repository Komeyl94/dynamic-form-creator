import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Button, Table } from "flowbite-react";
import { deleteForm } from "./formSlice";
import { useNavigate } from "react-router-dom";

const FormsList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const forms = useAppSelector((state) => state.forms.list);

  const removeForm = (id: string) => {
    dispatch(deleteForm(id));
  }

  const submitForm = (id: string) => {
    navigate(`/forms/submit/${id}`);
  }

  const viewForm = (id: string) => {
    navigate(`/forms/${id}/list`);
  }

  if (forms) {
    return (
      <div>
        <Button outline={true} gradientDuoTone="cyanToBlue" className="mb-4" href="/forms/add">Add Form</Button>
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>
              Index
            </Table.HeadCell>
            <Table.HeadCell>
              Name
            </Table.HeadCell>
            <Table.HeadCell>
              Description
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">
                Edit
              </span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {
              forms.length > 0 ? forms.map((form, index) => {
                return (
                  <Table.Row key={form.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell>
                      {form.name}
                    </Table.Cell>
                    <Table.Cell>
                      {form.description}
                    </Table.Cell>
                    <Table.Cell>
                      <a
                        href={`/forms/edit/${form.id}`}
                        className="font-medium text-blue-600 mx-3 hover:underline dark:text-blue-500"
                      >
                        Edit
                      </a>
                      <span
                        onClick={() => submitForm(form.id)}
                        className="font-medium cursor-pointer mx-3 text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Submit New
                      </span>
                      <span
                        onClick={() => viewForm(form.id)}
                        className="font-medium cursor-pointer mx-3 text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Submitted Forms
                      </span>
                      <span
                        onClick={() => removeForm(form.id)}
                        className="font-medium cursor-pointer mx-3 text-blue-600 hover:underline dark:text-blue-500"
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
      <Button outline={true} gradientDuoTone="cyanToBlue" href="/forms/add">Add Form</Button>
      <p>No Form Found!</p>
    </div>
  );
}

export default FormsList;