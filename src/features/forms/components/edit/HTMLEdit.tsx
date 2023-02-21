import { Checkbox, Dropdown, Label, TextInput } from "flowbite-react";
import { Field, FieldProps, ErrorMessage } from "formik";
import { useAppSelector } from "../../../../app/hooks";
import { TextNumberInputProps } from "../../types";

type HTMLInputEditProps = {
    index: number;
    permissions: string[];
    inputProps: TextNumberInputProps;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const HTMLInputEdit = ({ index, permissions, inputProps, setFieldValue }: HTMLInputEditProps) => {
    const users = useAppSelector((state) => state.permissions.users);

    const addPermissionForField = (type: string) => {
        if (permissions.includes(type)) {
            setFieldValue(`fields[${index}].permissions`, permissions.filter(p => p !== type));
        } else {
            setFieldValue(`fields[${index}].permissions`, [...permissions, type]);
        }
    }

    return (
        <div className="flex flex-wrap items-stretch my-3 p-5 pt-3 rounded-xl bg-slate-300">
            <p className="mb-3 text-sm font-medium">HTML Input</p>
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
            <div className="flex w-full">
                <Dropdown
                    label={`${permissions.length > 0 ? `(${permissions.length})` : 'Select'} Permissions`}
                    pill={true}
                    color="dark"
                    size="sm"
                >
                    {users.map((user) => (
                        <Dropdown.Item key={user.id} onClick={() => addPermissionForField(user.type)}>
                            {permissions.includes(user.type) ? `✔ ` : ``}{user.type}
                        </Dropdown.Item>
                    ))}
                </Dropdown>
                </div>
        </div>
    )
}

export default HTMLInputEdit