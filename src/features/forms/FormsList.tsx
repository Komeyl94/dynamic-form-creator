import React from 'react'
import { useAppSelector } from "../../app/hooks";
import { Button } from "flowbite-react";

const FormsList = () => {
  const forms = useAppSelector((state) => state.forms.list);

  if (forms) {
    return (<div>
      <Button outline={true} gradientDuoTone="cyanToBlue" href="/forms/add">Add Form</Button>
      {
        forms.map((form) => {
          return (<div>{form.id}</div>);
        })
      }
    </div>);
  }
  return (<div>
    <Button outline={true} gradientDuoTone="cyanToBlue" href="/forms/add">Add Form</Button>
    <p>No Form Found!</p>
  </div>);
}

export default FormsList;