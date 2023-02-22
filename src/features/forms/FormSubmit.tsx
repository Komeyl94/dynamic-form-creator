import React, { useEffect, useRef, useState } from 'react'
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
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
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
  const formRef = useRef<FormikProps<FormSubmitData>>(null);
  const [isInitialServicesDone, setIsInitialServicesDone] = useState(false);
  const user = useAppSelector((state) => state.user.profile);

  const callFakeService = (time: string, url: string) => new Promise((resolve) => {
    setTimeout(() => {
      console.log(`🤙 Call Fake Service ${time} --> ${url}`);
      resolve(time);
    }, 1000);
  })

  useEffect(() => {
    if (form.services) {
      const beforeInitIndex = form.services.findIndex((service) => service.time === "beforeInit");
      const afterInitIndex = form.services.findIndex((service) => service.time === "afterInit");
      if (beforeInitIndex !== -1) {
        callFakeService(form.services[beforeInitIndex].time, form.services[beforeInitIndex].url).then(() => {
          setIsInitialServicesDone(true);
          if (form.services && afterInitIndex !== -1) {
            callFakeService(form.services[afterInitIndex].time, form.services[afterInitIndex].url);
          }
        });
      } else {
        setIsInitialServicesDone(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveData = () => new Promise((resolve) => {
    if (formRef.current && formRef.current.values) {
      if (isFormEdit) {
        dispatch(updateSubmittedForm(formRef.current?.values));
      } else {
        dispatch(submitForm(formRef.current?.values));
      }
    }
    resolve(true);
  })

  const setFormDates = async () => {
    if (formRef.current && formRef.current.values) {
      const now = new Date().valueOf().toString();
      formRef.current.setFieldValue("updated_date", now);
      if (!formRef.current.values.created_date) {
        formRef.current.setFieldValue("created_date", now);
      }
    }
  }

  const onFormSubmit = async (_: FormSubmitData, { setSubmitting }: FormikHelpers<FormSubmitData>) => {
    setSubmitting(true);
    if (form.services) {
      const beforeSubmitIndex = form.services.findIndex((service) => service.time === "beforeSubmit");
      if (form.services && beforeSubmitIndex !== -1) {
        await callFakeService(form.services[beforeSubmitIndex].time, form.services[beforeSubmitIndex].url);
      }
    }

    await setFormDates();

    await saveData().then(() => {
      if (form.services) {
        const afterSubmitIndex = form.services.findIndex((service) => service.time === "afterSubmit");
        if (form.services && afterSubmitIndex !== -1) {
          callFakeService(form.services[afterSubmitIndex].time, form.services[afterSubmitIndex].url);
        }
      }
    });
    
    setSubmitting(false);
    navigate(-1);
  }

  if (isInitialServicesDone) {
    return (
      <Formik
        innerRef={formRef}
        initialValues={initialValues}
        enableReinitialize
        validate={values => {
          const errors = {};
          return errors;
        }}
        onSubmit={onFormSubmit}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className="flex flex-col items-center gap-4 w-full">
            <div className="flex flex-col items-stretch max-w-2xl lg:w-[42em]">
              <h1 className="text-2xl text-center font-bold mb-2">{form.name}</h1>
              <h2 className="text-lg text-center font-medium mb-10">{form.description}</h2>
              <div className="border p-5 rounded-2xl">
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
                    if (user && user.role && ((field.permissions.length > 0 && field.permissions.includes(user.role)) || (field.permissions.length === 0))) {
                      return (
                        <div key={field.label + index} className="my-3">
                          <Component field={field} />
                        </div>
                      );
                    } else {
                      return (
                        <div key={field.label + index} className="my-3 text-xs bg-red-50 text-red-500 rounded-lg px-3 py-1.5">
                          You dont have access to this field
                        </div>
                      )
                    }
                  })
                }
              </div>
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
  } else {
    return (
      <div className="flex flex-1 items-center justify-center h-screen">
        <Spinner />
      </div>
    )
  }
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