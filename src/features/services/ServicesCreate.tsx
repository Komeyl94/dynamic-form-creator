import { ErrorMessage, Form, Field, FieldProps, Formik } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { addService, updateService, selectServiceById } from "./servicesSlice";
import { v5 as uuidv5 } from "uuid";
import { Service } from "./types";
import { Button, Label, Select, Spinner, TextInput } from "flowbite-react";

type ServiceErrors = {
  name?: string;
  url?: string;
}

const UUID_NAMESPACE = "7aa1a8bc-1f25-494e-afbf-af9bf9a00db5";

const ServicesCreate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const location = useLocation();
  const isEdit = location.pathname.startsWith("/services/edit") && serviceId;
  const serviceInState = useSelector<RootState, Service | undefined>((state) => selectServiceById(state, serviceId || ""));
  const services = useAppSelector((state) => state.services.list);

  const timestamp = String(new Date().valueOf());
  const userUUID = uuidv5(timestamp, UUID_NAMESPACE);

  const initialValues: Service = serviceInState || { id: userUUID, name: "", url: "", time: "afterInit" };

  useEffect(() => {
    if (!isEdit) {
      navigate("/services/create", { replace: true })
    }
  }, [isEdit, navigate])

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validate={values => {
        const errors: ServiceErrors = {};
        const serviceNames = services.map(user => user.name);
        if (!values.name) {
          errors.name = "Enter a service name"
        } else if (serviceNames.indexOf(values.name) >= 0) {
          errors.name = "Service already exists"
        } else if (!values.url) {
          errors.url = "Enter a service url"
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          if (values.name && values.url) {
            setSubmitting(false);
            if (isEdit) {
              dispatch(updateService(values));
            } else {
              dispatch(addService(values));
            }
            navigate(-1);
          }
        }, 400);
      }}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <div className="flex flex-row justify-between">
          <div className="flex flex-col flex-1 items-center py-5">
            <h1 className="text-xl font-bold mb-10">{isEdit ? "Update Service" : "New Service"}</h1>
            <Form className="flex flex-col gap-4 w-full">
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="name"
                    value="Service name"
                  />
                </div>
                <Field name="name">
                  {({
                    field,
                  }: FieldProps) => (
                    <TextInput type="text" id="name" placeholder="Enter service name" {...field} />
                  )}
                </Field>
                <ErrorMessage name="type" component="div" />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="url"
                    value="Service url"
                  />
                </div>
                <Field name="url">
                  {({
                    field,
                  }: FieldProps) => (
                    <TextInput type="url" id="url" placeholder="Enter service url" {...field} />
                  )}
                </Field>
                <ErrorMessage name="url" component="div" />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="time"
                    value="Service time"
                  />
                </div>
                <Field name="time">
                  {({
                    field,
                  }: FieldProps) => (
                    <Select id="time" placeholder="Enter service time" {...field}>
                      <option value="beforeInit">Before Form Initiation</option>
                      <option value="afterInit">After Form Initiation</option>
                      <option value="beforeSubmit">Before Form Submit</option>
                      <option value="afterSubmit">After Form Submit</option>
                    </Select>
                  )}
                </Field>
                <ErrorMessage name="time" component="div" />
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
                  </>) : isEdit ? `✎ Update Service` : `+ Submit Service`}
              </Button>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default ServicesCreate;