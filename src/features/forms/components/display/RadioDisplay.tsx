import { Label, Radio } from "flowbite-react";
import { Field, FieldProps } from "formik";
import { FormField } from "../../types";
import { fieldNameGenerator } from "../../utils";

type Props = {
    field: FormField;
}

const RadioInputDisplay = ({ field: formField }: Props) => {
    const fieldName = fieldNameGenerator(formField.label, formField.id);
    return (
        <div>
            <fieldset
                className="flex flex-col gap-4"
            >
                <legend>
                    {formField.label}
                </legend>
                <div className="flex items-center">
                    {
                        formField.inputProps.options?.map((option) => {
                            return (
                                <div key={option.value}>
                                    <Field type="radio" value={option.value} name={fieldName}>
                                        {({
                                            field,
                                        }: FieldProps) => (
                                            <div className="flex items-center gap-2 mr-4">
                                                <Label>
                                                    <Radio {...field} />
                                                    {option.label}
                                                </Label>
                                            </div>
                                        )}
                                    </Field>
                                </div>
                            )
                        })
                    }
                </div>
            </fieldset>
            <p>{formField.description}</p>
        </div>
    )
}

export default RadioInputDisplay;