import { Button, Checkbox, Dropdown, Label, TextInput } from "flowbite-react";
import { Field, FieldProps, ErrorMessage, FieldArray, ArrayHelpers } from "formik";
import { useAppSelector } from "../../../../app/hooks";
import { SelectInputProps } from "../../types";

type SelectInputEditProps = {
    index: number;
    permissions: string[];
    inputProps: SelectInputProps;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const SelectInputEdit = ({ index, permissions, inputProps, setFieldValue }: SelectInputEditProps) => {
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
            <p className="mb-3 text-sm font-medium">Select Input</p>
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
            <div className="flex flex-col p-4 mt-4 border border-gray-500 rounded-2xl w-full">
                <p className="font-medium text-sm">Options:</p>
                <div className="flex flex-row items-center">
                    <FieldArray name={`fields[${index}].inputProps.options`}>
                        {(arrayHelpers: ArrayHelpers) => (
                            <div className="flex flex-col w-full">
                                <div className="flex flex-wrap items-center justify-center w-full mb-2">
                                    {
                                        inputProps.options?.map((option, optionIndex) => {
                                            return (
                                                <div key={option.value + optionIndex} className="flex flex-row w-full items-center justify-center">
                                                    <span className="mx-2 font-bold">{optionIndex + 1}</span>
                                                    <div>
                                                        <Field name={`fields[${index}].inputProps.options[${optionIndex}].label`}>
                                                            {({
                                                                field,
                                                            }: FieldProps) => (
                                                                <TextInput type="text" placeholder="Enter option label" required {...field} className="m-1" />
                                                            )}
                                                        </Field>
                                                        <ErrorMessage name={`fields[${index}].inputProps.options[${optionIndex}].label`} component="div" />
                                                    </div>
                                                    <div>
                                                        <Field name={`fields[${index}].inputProps.options[${optionIndex}].value`}>
                                                            {({
                                                                field,
                                                            }: FieldProps) => (
                                                                <TextInput type="text" placeholder="Enter option value" required {...field} className="m-1" />
                                                            )}
                                                        </Field>
                                                        <ErrorMessage name={`fields[${index}].inputProps.options[${optionIndex}].value`} component="div" />
                                                    </div>
                                                    <Button onClick={() => arrayHelpers.remove(optionIndex)} className="p-0 my-2 ml-2 scale-75" size="xs" color="failure" pill={true}>
                                                        <span className="text-lg leading-[18px] text-bold block pb-1">×</span>
                                                    </Button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <Button onClick={() => arrayHelpers.push({ value: "", label: "" })}>Add Option</Button>
                            </div>
                        )}
                    </FieldArray>
                </div>
            </div>
        </div>
    )
}

export default SelectInputEdit;