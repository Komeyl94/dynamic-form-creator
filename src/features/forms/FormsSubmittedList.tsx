import { useAppDispatch } from "../../app/hooks";
import { Button, Table } from "flowbite-react";
import { deleteSubmittedForm, FormSubmitData, selectFormById, selectFormsSubmittedById } from "./formSlice";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { FormType } from "./types";

const FormsSubmittedList = () => {
  const { formId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formInState = useSelector<RootState, FormType | undefined>((state) => selectFormById(state, formId || ""));
  const formsSubmitted = useSelector<RootState, FormSubmitData[] | undefined>((state) => selectFormsSubmittedById(state, formId || ""));

  const removeForm = (id: string) => {
    dispatch(deleteSubmittedForm(id));
  }

  const editForm = (id: string, formId: string) => {
    navigate(`/forms/submit/edit/${id}/${formId}`);
  }

  if (formsSubmitted) {
    return (<div>
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>
            Index
          </Table.HeadCell>
          <Table.HeadCell>
            Form Name
          </Table.HeadCell>
          <Table.HeadCell>
            Created Date
          </Table.HeadCell>
          <Table.HeadCell>
            Updated Date
          </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">
              Edit
            </span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {
            formsSubmitted.length > 0 ? formsSubmitted.map((form, index) => {
              return (
                <Table.Row key={String(form.id)} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell>
                    {formInState?.name}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(parseInt(form.created_date)).toDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(parseInt(form.updated_date)).toDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => editForm(String(form.id), String(form.formId))}
                      className="font-medium text-blue-600 mx-2 hover:underline dark:text-blue-500"
                    >
                      Edit
                    </span>
                    <span
                      onClick={() => removeForm(String(form.id))}
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
    <Button outline={true} gradientDuoTone="cyanToBlue" href="/forms/add">Add Form</Button>
    <p>No Form Found!</p>
  </div>);
}

export default FormsSubmittedList;