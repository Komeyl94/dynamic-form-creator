import { Checkbox, Dropdown, Label, TextInput } from "flowbite-react";
import { Field, FieldProps, ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../app/hooks";
import { camelCaseToNormal } from "../../../../utils/utilities";
import { TextNumberInputProps } from "../../types";

type TextInputEditProps = {
    index: number;
    permissions: string[];
    inputProps: TextNumberInputProps;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

type Validations = {
    minLength: number | undefined;
    maxLength: number | undefined;
}

const TextInputEdit = ({ index, permissions, inputProps, setFieldValue }: TextInputEditProps) => {
    const defaultValidationValue = { minLength: inputProps.minLength || undefined, maxLength: inputProps.maxLength || undefined };
    const [validations, setValidations] = useState<Validations>(defaultValidationValue);
    const users = useAppSelector((state) => state.permissions.users);
    const navigate = useNavigate();

    const addMinLength = () => {
        if (validations.minLength === undefined) {
            setValidations({ ...validations, minLength: 3 });
            setFieldValue(`fields[${index}].inputProps.minLength`, 3);
        } else {
            setValidations({ ...validations, minLength: undefined });
            setFieldValue(`fields[${index}].inputProps.minLength`, undefined);
        }
    }

    const addMaxLength = () => {
        if (validations.maxLength === undefined) {
            setValidations({ ...validations, maxLength: 16 });
            setFieldValue(`fields[${index}].inputProps.maxLength`, 16);
        } else {
            setValidations({ ...validations, maxLength: undefined });
            setFieldValue(`fields[${index}].inputProps.maxLength`, undefined);
        }
    }

    const addPermissionForField = (type: string) => {
        if (permissions.includes(type)) {
            setFieldValue(`fields[${index}].permissions`, permissions.filter(p => p !== type));
        } else {
            setFieldValue(`fields[${index}].permissions`, [...permissions, type]);
        }
    }

    return (
        <div className="flex flex-wrap items-stretch my-3 p-5 pt-3 rounded-xl bg-slate-300">
            <p className="mb-3 text-sm font-medium">Text Input</p>
            <div className="mb-1 flex w-full">
                <Field name={`fields[${index}].label`}>
                    {({
                        field,
                    }: FieldProps) => (
                        <TextInput type="text" className="w-full" sizing="sm" placeholder="Enter input label" {...field} />
                    )}
                </Field>
                <ErrorMessage name={`fields[${index}].label`} component="div" />
            </div>
            <div className="mb-1 flex w-full">
                <Field name={`fields[${index}].inputProps.placeholder`}>
                    {({
                        field,
                    }: FieldProps) => (
                        <TextInput type="text" className="w-full" placeholder="Enter input placeholder" {...field} />
                    )}
                </Field>
                <ErrorMessage name={`fields[${index}].inputProps.placeholder`} component="div" />
            </div>
            <div className="mb-4 flex w-full">
                <Field name={`fields[${index}].description`}>
                    {({
                        field,
                    }: FieldProps) => (
                        <TextInput type="text" className="w-full" placeholder="Enter input description" {...field} />
                    )}
                </Field>
                <ErrorMessage name={`fields[${index}].description`} component="div" />
            </div>
            <div className="mb-4 flex w-full">
                <Field type="checkbox" name={`fields[${index}].inputProps.required`}>
                    {({
                        field,
                    }: FieldProps) => (
                        <Checkbox id={`fields[${index}].inputProps.required`} {...field} />
                    )}
                </Field>
                <Label htmlFor={`fields[${index}].inputProps.required`} className="pl-3 leading-4">
                    Required
                </Label>
            </div>
            <div className="flex gap-2 w-full">
                <Dropdown
                    label="Add validation"
                    pill={true}
                    color="dark"
                    size="sm"
                >
                    <Dropdown.Item onClick={addMinLength}>
                        {validations.minLength !== undefined ? `✔ ` : ``}Minimum character length
                    </Dropdown.Item>
                    <Dropdown.Item onClick={addMaxLength}>
                        {validations.maxLength !== undefined ? `✔ ` : ``}Maximum character length
                    </Dropdown.Item>
                </Dropdown>
                <Dropdown
                    label={`${permissions.length > 0 ? `(${permissions.length})` : 'Select'} Permissions`}
                    pill={true}
                    color="dark"
                    size="sm"
                >
                    {users.length > 0 ? users.map((user) => (
                        <Dropdown.Item key={user.id} onClick={() => addPermissionForField(user.type)}>
                            {permissions.includes(user.type) ? `✔ ` : ``}{user.type}
                        </Dropdown.Item>
                    )) : (
                        <Dropdown.Item onClick={() => navigate("/permissions/create")}>
                            There are no permissions/roles. Click to add
                        </Dropdown.Item>
                    )}
                </Dropdown>
            </div>
            <div className={"flex flex-col p-4 mt-4 border border-gray-500 rounded-2xl w-full" + (Object.values(validations).every((val) => val === undefined) ? " hidden" : "")}>
                <p className="font-medium text-sm">Validations</p>
                <div className="flex flex-row items-center">
                    {
                        Object.entries(validations).map((entry) => {
                            if (entry[1] !== undefined) {
                                return (<div key={entry[0]} className="w-1/2 mt-4 mx-1">
                                    <Label>{camelCaseToNormal(entry[0])}</Label>
                                    <Field name={`fields[${index}].inputProps.${entry[0]}`}>
                                        {({
                                            field,
                                        }: FieldProps) => (
                                            <TextInput
                                                type="number"
                                                className="w-full"
                                                {...field}
                                            />
                                        )}
                                    </Field>
                                    <small className="text-gray-500">{`Enter input ${camelCaseToNormal(entry[0])}`}</small>
                                </div>);
                            }
                            return "";
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default TextInputEdit;