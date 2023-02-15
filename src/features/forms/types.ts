import { TextInputProps } from 'flowbite-react';

export type FormFieldTypes = "number" | "text" | "textarea" | "date" | "daterange" | "select" | "radio" | "checkbox";

export type FormField = {
    id: string;
    inputProps: TextInputProps;
    type?: FormFieldTypes;
    name?: string;
    label: string;
    description: string;
    permission: string;
    validate: string;
    formatting: string;
}

export type Form = {
    id: string;
    name: string;
    display: string;
    fields: FormField[];
    beforeInit?: () => {};
    afterInit?: () => {};
    beforeSubmit?: () => {};
    afterSubmit?: () => {};
}