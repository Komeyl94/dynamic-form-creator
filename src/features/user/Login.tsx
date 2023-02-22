import { Button, Label, Select, Spinner, TextInput } from "flowbite-react";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik"
import React from 'react'
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { User } from "./types"
import { login } from "./userSlice";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const roles = useAppSelector((state) => state.permissions.users);

    const initialValues: User = { email: "", role: "admin" };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    setSubmitting(false);
                    dispatch(login(values));
                    navigate("/forms", { replace: true });
                }, 400);
            }}
        >
            {({ values, isSubmitting, setFieldValue }) => (
                <div className="flex flex-row justify-center">
                    <div className="flex flex-col flex-1 items-center py-5 max-w-2xl lg:w-[42em]">
                        <Form className="flex flex-col gap-4 w-full border p-5 rounded-2xl">
                            <h1 className="text-xl font-bold mb-10">Login</h1>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="email"
                                        value="Email"
                                    />
                                </div>
                                <Field name="email">
                                    {({
                                        field,
                                    }: FieldProps) => (
                                        <TextInput type="email" id="email" placeholder="Enter your email" {...field} />
                                    )}
                                </Field>
                                <ErrorMessage name="email" component="div" />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="role"
                                        value="Role"
                                    />
                                </div>
                                <Field name="role">
                                    {({
                                        field,
                                    }: FieldProps) => (
                                        <Select id="role" required placeholder="Enter your role" {...field}>
                                            <option value="">Select an option</option>
                                            {
                                                roles.length > 0 ? roles.map((role) => {
                                                    return (
                                                        <option key={role.type} value={role.type}>{role.type}</option>
                                                    )
                                                }) : (
                                                    // First user is gonna be an admin
                                                    // In order to test permission, login and then add user permissions/roles
                                                    <option value="admin">Admin</option>
                                                )
                                            }
                                        </Select>
                                    )}
                                </Field>
                                <small className="block">First user is gonna be an admin</small>
                                <small className="block">In order to test field permissions, login and then add user permissions/roles</small>
                                <ErrorMessage name="role" component="div" />
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
                                    </>) : `Login`}
                            </Button>
                        </Form>
                    </div>
                </div>
            )}
        </Formik>
    )
}

export default Login