import React, { useEffect, useState } from 'react'
import Text from './components/display/TextDisplay';
import Number from './components/display/NumberDisplay';
import HTML from './components/display/HTMLDisplay';
import DateDisplay from './components/display/DateDisplay';
import DateRange from './components/display/DateRangeDisplay';
import Select from './components/display/SelectDisplay';
import Radio from './components/display/RadioDisplay';
import Checkbox from './components/display/CheckboxDisplay';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Formik, Form } from "formik";
import { Button, Spinner } from "flowbite-react";
import { FormType } from "./types";
import { FormSubmitData, selectSubmittedFormById, submitForm, updateSubmittedForm } from "./formSlice";
import { v5 as uuidv5 } from "uuid";
import { fieldNameGenerator } from "./utils";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

type FormShowProps = {
  initialValues: FormSubmitData;
  form: FormType;
  isFormEdit: boolean;
}

const UUID_NAMESPACE = "7aa1a8bc-1f25-494e-afbf-af9bf9a00db5";

const FormShow = ({ initialValues, form, isFormEdit }: FormShowProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validate={values => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting, setFieldValue }) => {
        const now = new Date().valueOf().toString();
        values.updated_date = now;
        if (!values.created_date) {
          values.created_date = now;
        }

        setTimeout(() => {
          setSubmitting(false);

          if (isFormEdit) {
            dispatch(updateSubmittedForm(values));
          } else {
            dispatch(submitForm(values));
          }

          navigate(-1);
        }, 400);
      }}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form className="flex flex-col gap-4 w-full pr-7">
          <div className="flex flex-col justify-between">
            <h1>{form.name}</h1>
            <h2>{form.description}</h2>
            {
              form.fields.map((field, index) => {
                const components = {
                  "text": Text,
                  "number": Number,
                  "html": HTML,
                  "date": DateDisplay,
                  "daterange": DateRange,
                  "select": Select,
                  "radio": Radio,
                  "checkbox": Checkbox,
                };
                const Component = components[field.type || "text"];
                return (<Component key={field.label + index} field={field} />);
              })
            }
            <Button type="submit" disabled={isSubmitting} className="mt-6" gradientDuoTone="greenToBlue" size="lg">
              {isSubmitting ? (
                <><div className="mr-3">
                  <Spinner
                    size="sm"
                    light={true}
                  />
                </div>
                  Saving ...
                </>) : isFormEdit ? `✎ Update Data` : `+ Submit Data`}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

const FormSubmit = () => {
  const { id, formId } = useParams();
  const location = useLocation();
  const forms = useAppSelector((state) => state.forms.list);
  const form = forms.find((form) => form.id === formId);
  const savedForm = useSelector<RootState, FormSubmitData | undefined>((state) => selectSubmittedFormById(state, id || ""));
  const isFormEdit = location.pathname.startsWith("/forms/submit/edit");

  const timestamp = String(new Date().valueOf());
  const formUUID = uuidv5(timestamp, UUID_NAMESPACE);

  const [initialValues, setInitialValues] = useState<FormSubmitData>(
    isFormEdit && savedForm ? { ...savedForm } : { id: formUUID, formId: formId || "", updated_date: "", created_date: "" }
  );

  useEffect(() => {
    if (form && !isFormEdit) {
      const values: FormSubmitData = { ...initialValues };
      for (let i = 0; i < form.fields.length; i++) {
        const field = form.fields[i];
        const key = fieldNameGenerator(field.label, field.id);
        if (field.type === "daterange") {
          values[`${key}_start`] = "";
          values[`${key}_end`] = "";
        } else {
          values[`${key}`] = "";
        }
      }
      setInitialValues(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (form && Object.keys(initialValues).length > 4) {
    return (
      <div>
        <FormShow initialValues={initialValues} form={form} isFormEdit={isFormEdit} />
      </div>
    );
  }
  return (<div>No Form Found!</div>);
}

export default FormSubmit;