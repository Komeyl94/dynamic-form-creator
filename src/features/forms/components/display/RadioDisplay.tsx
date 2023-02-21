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
                <div className="block -mb-2">
                    <Label value={formField.label} />
                </div>
                <div role="group" className="flex items-center mb-0.5">
                    {
                        formField.inputProps.options?.map((option) => {
                            return (
                                <div key={option.value}>
                                    <Field type="radio" value={option.value} name={fieldName}>
                                        {({
                                            field,
                                        }: FieldProps) => (
                                            <div className="flex items-center gap-2 mr-4 bg-gray-100 px-2.5 py-1.5 border rounded-3xl">
                                                <Radio id={fieldName+option.value} {...field} />
                                                <Label htmlFor={fieldName+option.value}>{option.label}</Label>
                                            </div>
                                        )}
                                    </Field>
                                </div>
                            )
                        })
                    }
                </div>
            </fieldset>
            <small>{formField.description}</small>
        </div>
    )
}

export default RadioInputDisplay;