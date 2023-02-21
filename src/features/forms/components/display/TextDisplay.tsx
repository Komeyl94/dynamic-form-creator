import { Label, TextInput } from "flowbite-react";
import { Field, FieldProps } from "formik";
import { FormField } from "../../types";
import { fieldNameGenerator } from "../../utils";

type Props = {
    field: FormField;
}

const TextInputDisplay = ({ field: formField }: Props) => {
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
                    <TextInput type="text" {...formField.inputProps} {...field} />
                    <small>{formField.description}</small>
                </div>
            )}
        </Field>
    )
}

export default TextInputDisplay;