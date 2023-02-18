import React from 'react'
import { useAppSelector } from "../../app/hooks";
import { Button, Table } from "flowbite-react";

const FormsList = () => {
  const forms = useAppSelector((state) => state.forms.list);

  if (forms) {
    return (<div>
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
            forms.map((form, index) => {
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
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Edit
                    </a>
                  </Table.Cell>
                </Table.Row>
              );
            })
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

export default FormsList;