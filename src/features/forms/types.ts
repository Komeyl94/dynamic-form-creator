import { Service } from "../services/types";

export type FormFieldTypes = "number" | "text" | "html" | "date" | "daterange" | "select" | "radio" | "checkbox";

export type TextNumberInputProps = {
    placeholder?: string;
    required: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

export type SelectInputOption = {
    label: string;
    value: string;
}

export type SelectInputProps = {
    options?: SelectInputOption[];
    required: boolean;
}

export type RadioInputOption = {
    label: string;
    value: string;
}

export type RadioInputProps = {
    options: RadioInputOption[];
    required: boolean;
}

export type CheckboxInputOption = {
    label: string;
    value: string;
}

export type CheckboxInputProps = {
    options: CheckboxInputOption[];
    required: boolean;
}

export type DateInputProps = {
    placeholder?: string;
    required: boolean;
    min?: number;
    max?: number;
}
export type DateRangeInputProps = {
    startDatePlaceholder?: string;
    endDatePlaceholder?: string;
    required: boolean;
    min?: number;
    max?: number;
}

export type FormFieldInputProps = TextNumberInputProps & SelectInputProps & DateInputProps & DateRangeInputProps & RadioInputProps & CheckboxInputProps;

export type FormField = {
    id: string;
    inputProps: FormFieldInputProps;
    type: FormFieldTypes;
    name: string;
    label: string;
    description: string;
    permissions: string[];
    validations: string;
    formatting: string;
}

export type FormType = {
    id: string;
    name: string;
    description: string;
    fields: FormField[];
    services?: Service[];
    beforeInit?: () => {};
    afterInit?: () => {};
    beforeSubmit?: () => {};
    afterSubmit?: () => {};
}