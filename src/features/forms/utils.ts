export const emptyTextInputObj = {
  id: "",
  description: "",
  label: "",
  formatting: "",
  inputProps: {
    required: false,
    placeholder: "",
    minLength: "",
    maxLength: "",
  },
  permissions: "",
  validations: "",
  type: "text",
  name: "",
};

export const emptyNumberInputObj = {
  id: "",
  description: "",
  label: "",
  formatting: "",
  inputProps: { required: false, placeholder: "", min: "", max: "" },
  permissions: "",
  validations: "",
  type: "number",
  name: "",
};

export const emptyHTMLInputObj = {
  id: "",
  description: "",
  label: "",
  formatting: "",
  inputProps: { required: false, placeholder: "", min: "", max: "" },
  permissions: "",
  validations: "",
  type: "html",
  name: "",
};

export const emptyDateInputObj = {
  id: "",
  description: "",
  label: "",
  formatting: "",
  inputProps: { required: false, placeholder: "", min: "", max: "" },
  permissions: "",
  validations: "",
  type: "date",
  name: "",
};

export const emptyDateRangeInputObj = {
  id: "",
  description: "",
  label: "",
  formatting: "",
  inputProps: { required: false, placeholder: "", min: "", max: "" },
  permissions: "",
  validations: "",
  type: "daterange",
  name: "",
};

export const emptySelectInputObj = {
  id: "",
  description: "",
  label: "",
  formatting: "",
  inputProps: { required: false, options: [{ value: "", label: "" }] },
  permissions: "",
  validations: "",
  type: "select",
  name: "",
};

export const emptyRadioInputObj = {
  id: "",
  description: "",
  label: "",
  formatting: "",
  inputProps: { required: false, options: [{ value: "", label: "" }] },
  permissions: "",
  validations: "",
  type: "radio",
  name: "",
};

export const emptyCheckboxInputObj = {
  id: "",
  description: "",
  label: "",
  formatting: "",
  inputProps: { required: false, options: [{ value: "", label: "" }] },
  permissions: "",
  validations: "",
  type: "checkbox",
  name: "",
};

export const fieldNameGenerator = (
  label: string,
  id: string,
  suffix?: string
) => {
  if (suffix) {
    return `${label.replaceAll(" ", "_").toLowerCase()}##${id}_${suffix}`;
  } else {
    return `${label.replaceAll(" ", "_").toLowerCase()}##${id}`;
  }
};

export const formatPatterns = [
  {name: "Phone Number", pattern: "#### ### ## ##"},
  {name: "Card Number", pattern: "#### #### #### ####"}
]