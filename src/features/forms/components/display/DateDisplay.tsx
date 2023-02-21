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
        <Field name={fieldName}>
            {({
                field,
            }: FieldProps) => (
                <div>
                    <div className="mb-2 block">
                        <Label value={formField.label} />
                    </div>
                    <TextInput type="date" {...formField.inputProps} {...field} />
                    <p>{formField.description}</p>
                </div>
            )}
        </Field>
    )
}

export default DateInputDisplay;