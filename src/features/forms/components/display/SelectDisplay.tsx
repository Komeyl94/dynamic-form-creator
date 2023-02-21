import { Label, Select } from "flowbite-react";
import { Field, FieldProps } from "formik";
import { FormField } from "../../types";
import { fieldNameGenerator } from "../../utils";

type Props = {
    field: FormField;
}

const SelectInputDisplay = ({ field: formField }: Props) => {
    const fieldName = fieldNameGenerator(formField.label, formField.id);
    return (
        <Field name={fieldName} defaultValue="">
            {({
                field,
            }: FieldProps) => (
                <div>
                    <div className="mb-2 block">
                        <Label value={formField.label} />
                    </div>
                    <Select required={formField.inputProps.required} {...field}>
                        <option value="">Select an option</option>
                        {
                            formField.inputProps.options?.map((option) => {
                                return (<option key={option.value} label={option.label} value={option.value}>{option.label}</option>)
                            })
                        }
                    </Select>
                    <small>{formField.description}</small>
                </div>
            )}
        </Field>
    )
}

export default SelectInputDisplay;