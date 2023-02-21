import { ErrorMessage, Form, Field, FieldProps, Formik } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { addPermission, updatePermission, selectUserById } from "./permissionsSlice";
import { v5 as uuidv5 } from "uuid";
import { User } from "./types";
import { Button, Label, Spinner, TextInput } from "flowbite-react";

type PermissionErrors = {
  type?: string;
}

const UUID_NAMESPACE = "7aa1a8bc-1f25-494e-afbf-af9bf9a00db5";

const PermissionsCreate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const location = useLocation();
  const isEdit = location.pathname.startsWith("/permissions/edit") && userId;
  const userInState = useSelector<RootState, User | undefined>((state) => selectUserById(state, userId || ""));
  const users = useAppSelector((state) => state.permissions.users);

  const timestamp = String(new Date().valueOf());
  const userUUID = uuidv5(timestamp, UUID_NAMESPACE);

  const initialValues: User = userInState || { id: userUUID, type: "" };

  useEffect(() => {
    if (!isEdit) {
      navigate("/permissions/create", { replace: true })
    }
  }, [isEdit, navigate])

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validate={values => {
        const errors: PermissionErrors = {};
        const userTypes = users.map(user => user.type);
        if (!values.type) {
          errors.type = "Enter a user permission name"
        } else if (userTypes.indexOf(values.type) >= 0) {
          errors.type = "Permission already exists"
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          if (values.type) {
            setSubmitting(false);
            if (isEdit) {
              dispatch(updatePermission(values));
            } else {
              dispatch(addPermission(values));
            }
            navigate(-1);
          }
        }, 400);
      }}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <div className="flex flex-row justify-between">
          <div className="flex flex-col flex-1 items-center py-5">
            <h1 className="text-xl font-bold mb-10">{isEdit ? "Update Permission" : "New Permission"}</h1>
            <Form className="flex flex-col gap-4 w-full">
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="type"
                    value="Permission type"
                  />
                </div>
                <Field name="type">
                  {({
                    field,
                  }: FieldProps) => (
                    <TextInput type="text" id="type" placeholder="Enter permission type" {...field} />
                  )}
                </Field>
                <ErrorMessage name="type" component="div" />
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
                  </>) : isEdit ? `✎ Update Permission` : `+ Submit Permission`}
              </Button>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default PermissionsCreate