import { Label } from "flowbite-react";
import { Field, FieldProps, FormikProps } from "formik";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FormSubmitData } from "../../formSlice";
import { FormField } from "../../types";
import { fieldNameGenerator } from "../../utils";

type Props = {
    field: FormField;
}

const HTMLInputDisplay = ({ field: formField }: Props) => {
    const fieldName = fieldNameGenerator(formField.label, formField.id);
    const [value, setValue] = useState('');
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    const onHTMLFieldChange = (form: FormikProps<FormSubmitData>, val: string) => {
        setValue(val);
        form.setFieldValue(fieldName, val);
    }

    return (
        <Field name={fieldName}>
            {({
                field,
                form
            }: FieldProps) => (
                <div>
                    <div className="mb-2 block">
                        <Label value={formField.label} />
                    </div>
                    <ReactQuill
                        theme="snow"
                        value={field.value || value}
                        modules={modules}
                        formats={formats}
                        placeholder={formField.inputProps.placeholder}
                        onChange={(value: string) => onHTMLFieldChange(form, value)}
                    />
                    <small>{formField.description}</small>
                </div>
            )}
        </Field>
    )
}

export default HTMLInputDisplay;