import React from 'react'
import Text from './components/display/TextDisplay';
import Number from './components/display/NumberDisplay';
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

export async function loader({ params }: LoaderFunctionArgs) {
  return params.formId;
}

const FormDisplay = () => {
  const formId = useLoaderData();
  const forms = useAppSelector((state) => state.forms.list);
  const form = forms.find((form) => form.id === formId);

  if (form) {
    return (
      <div>
        <h1>{form.name}</h1>
        {
          form.fields.map((field) => {
            const components = {
              "text": Text,
              "number": Number,
              "html": Number,
              "date": Number,
              "daterange": Number,
              "select": Number,
              "radio": Number,
              "checkbox": Number,
            };
            const Component = components[field.type || "text"];
            return (<Component {...field} />);
          })
        }
      </div>
    )
  }
  return (<div>No Form Found!</div>);
}

export default FormDisplay;