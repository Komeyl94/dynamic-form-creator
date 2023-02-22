import { Label, TextInput } from "flowbite-react";
import { Field, FieldProps } from "formik";
import { PatternFormat } from "react-number-format";
import { FormField } from "../../types";
import { fieldNameGenerator } from "../../utils";

type Props = {
    field: FormField;
}

const NumberInputDisplay = ({ field: formField }: Props) => {
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
                    {
                        formField.formatting ?
                            <PatternFormat className="w-full bg-gray-50 rounded-lg placeholder:text-sm" format={formField.formatting} mask="_" placeholder={formField.inputProps.placeholder} {...formField.inputProps} {...field} />
                            : <TextInput type="number" {...formField.inputProps} {...field} />
                    }
                    <small>{formField.description}</small>
                </div>
            )}
        </Field>
    )
}

export default NumberInputDisplay;