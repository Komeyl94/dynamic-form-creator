import { Label, TextInput } from "flowbite-react";
import { Field, FieldProps } from "formik";
import { FormField } from "../../types";
import { fieldNameGenerator } from "../../utils";

type Props = {
    field: FormField;
}

const DateInputDisplay = ({ field: formField }: Props) => {
    const fieldName = fieldNameGenerator(formField.label, formField.id);
    return (
        <div className="flex flex-col">
            <div className="mb-2 block">
                <Label value={formField.label} />
            </div>
            <div className="flex justify-between items-center">
                <Field name={`${fieldName}_start`}>
                    {({
                        field,
                    }: FieldProps) => (
                        <TextInput
                            className="flex-1 mx-1"
                            type="date"
                            placeholder={formField.inputProps.startDatePlaceholder}
                            required={formField.inputProps.required} {...field}
                        />
                    )}
                </Field>
                <Field name={`${fieldName}_end`}>
                    {({
                        field,
                    }: FieldProps) => (
                        <TextInput
                            className="flex-1 mx-1"
                            type="date"
                            placeholder={formField.inputProps.endDatePlaceholder}
                            required={formField.inputProps.required} {...field}
                        />
                    )}
                </Field>
            </div>
            <p>{formField.description}</p>
        </div>
    )
}

export default DateInputDisplay;