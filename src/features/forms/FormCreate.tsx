import { Dropdown, Spinner, Textarea, TextInput } from "flowbite-react"
import { Button, Label } from "flowbite-react"
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { SortableItem } from "./components/SortableItem";
import { FormType } from "./types";
import { Formik, Form, Field, ErrorMessage, FieldProps, FieldArray, ArrayHelpers } from 'formik';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addForm, selectFormById, updateForm } from "./formSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { v5 as uuidv5 } from "uuid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { emptyTextInputObj, emptyNumberInputObj, emptyHTMLInputObj, emptyDateInputObj, emptySelectInputObj, emptyRadioInputObj, emptyCheckboxInputObj, emptyDateRangeInputObj } from "./utils";
import { Service } from "../services/types";

const UUID_NAMESPACE = "7aa1a8bc-1f25-494e-afbf-af9bf9a00db5";

const FormCreate = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { formId } = useParams();
    const location = useLocation();
    const services = useAppSelector((state) => state.services.list);
    const [selectedServices, setSelectedServices] = useState<Service[]>([])

    const isEdit = location.pathname.startsWith("/forms/edit") && formId;
    const formInState = useSelector<RootState, FormType | undefined>((state) => selectFormById(state, formId || ""));

    const timestamp = String(new Date().valueOf());
    const formUUID = uuidv5(timestamp, UUID_NAMESPACE);

    const initialValues: FormType = formInState || { id: formUUID, name: "", description: "", fields: [], services: [] };

    console.log('formInState', formInState)

    useEffect(() => {
        if (!isEdit) {
            navigate("/forms/add", { replace: true })
        }
    }, [isEdit, navigate])

    useEffect(() => {
        if (formInState) {
            setSelectedServices(formInState.services || []);
        }
    }, [formInState])

    const addTextInput = (arrayHelpers: ArrayHelpers) => {
        const time = String(new Date().valueOf());
        arrayHelpers.push({ ...emptyTextInputObj, id: uuidv5(time, UUID_NAMESPACE) })
    }

    const addNumberInput = (arrayHelpers: ArrayHelpers) => {
        const time = String(new Date().valueOf());
        arrayHelpers.push({ ...emptyNumberInputObj, id: uuidv5(time, UUID_NAMESPACE) })
    }

    const addHTMLInput = (arrayHelpers: ArrayHelpers) => {
        const time = String(new Date().valueOf());
        arrayHelpers.push({ ...emptyHTMLInputObj, id: uuidv5(time, UUID_NAMESPACE) })
    }

    const addDateInput = (arrayHelpers: ArrayHelpers) => {
        const time = String(new Date().valueOf());
        arrayHelpers.push({ ...emptyDateInputObj, id: uuidv5(time, UUID_NAMESPACE) })
    }

    const addDateRangeInput = (arrayHelpers: ArrayHelpers) => {
        const time = String(new Date().valueOf());
        arrayHelpers.push({ ...emptyDateRangeInputObj, id: uuidv5(time, UUID_NAMESPACE) })
    }

    const addSelectInput = (arrayHelpers: ArrayHelpers) => {
        const time = String(new Date().valueOf());
        arrayHelpers.push({ ...emptySelectInputObj, id: uuidv5(time, UUID_NAMESPACE) })
    }

    const addRadioInput = (arrayHelpers: ArrayHelpers) => {
        const time = String(new Date().valueOf());
        arrayHelpers.push({ ...emptyRadioInputObj, id: uuidv5(time, UUID_NAMESPACE) })
    }

    const addCheckboxInput = (arrayHelpers: ArrayHelpers) => {
        const time = String(new Date().valueOf());
        arrayHelpers.push({ ...emptyCheckboxInputObj, id: uuidv5(time, UUID_NAMESPACE) })
    }

    const handleDragEnd = (event: DragEndEvent, arrayHelpers: ArrayHelpers) => {
        if (event.active.data.current && event.over) {
            arrayHelpers.swap(event.active.data.current.sortable.index, event.over.data.current?.sortable.index);
        }
    };

    const removeInput = (index: number, arrayHelpers: ArrayHelpers) => {
        arrayHelpers.remove(index);
    };

    const addServiceToForm = (service: Service, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
        let selectedServicesCopy = [...selectedServices];
        const index = selectedServicesCopy.findIndex((s) => s.id === service.id);
        if (index >= 0) {
            selectedServicesCopy.splice(index, 1);
        } else {
            selectedServicesCopy.push(service);
        }
        setSelectedServices(selectedServicesCopy);
        setFieldValue("services", selectedServicesCopy);
    };

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize
            validate={values => {
                const errors = {};
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    setSubmitting(false);
                    if (isEdit) {
                        dispatch(updateForm(values));
                    } else {
                        dispatch(addForm(values));
                    }
                    navigate(-1);
                }, 400);
            }}
        >
            {({ values, isSubmitting, setFieldValue }) => (
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col flex-1 items-center py-5">
                        <h1 className="text-xl font-bold mb-10">{isEdit ? "Update Form" : "New Form"}</h1>
                        <Form className="flex flex-col gap-4 w-full">
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="name"
                                        value="Form name"
                                    />
                                </div>
                                <Field name="name">
                                    {({
                                        field,
                                    }: FieldProps) => (
                                        <TextInput type="text" id="name" placeholder="Enter form name" {...field} />
                                    )}
                                </Field>
                                <ErrorMessage name="name" component="div" />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="description"
                                        value="Form description"
                                    />
                                </div>
                                <Field name="description">
                                    {({
                                        field,
                                    }: FieldProps) => (
                                        <Textarea id="description" placeholder="Enter form description" {...field} />
                                    )}
                                </Field>
                                <ErrorMessage name="description" component="div" />
                            </div>
                            <FieldArray name="fields">
                                {(arrayHelpers: ArrayHelpers) => (
                                    <div className="flex flex-col">
                                        <div className="bg-slate-200 px-4 py-6 rounded-xl flex flex-col mb-2">
                                            <DndContext onDragEnd={(e) => handleDragEnd(e, arrayHelpers)}>
                                                <SortableContext items={values.fields} id={values.id}>
                                                    {values.fields.length > 0 &&
                                                        values.fields.map((field, index) => (
                                                            <SortableItem
                                                                key={field.id}
                                                                index={index}
                                                                field={field}
                                                                removeInput={(i) => removeInput(i, arrayHelpers)}
                                                                setFieldValue={setFieldValue}
                                                            />
                                                        ))}
                                                </SortableContext>
                                            </DndContext>
                                            {values.fields.length === 0 ? <div className="text-center opacity-50 w-full">No Inputs Yet!</div> : ""}
                                        </div>
                                        <div className="flex flex-row items-stretch">
                                            <Dropdown
                                                label="Add New Field"
                                                gradientDuoTone="redToYellow"
                                            >
                                                <Dropdown.Item onClick={() => addTextInput(arrayHelpers)}>
                                                    Text Input
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => addNumberInput(arrayHelpers)}>
                                                    Number Input
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => addHTMLInput(arrayHelpers)}>
                                                    Textarea/HTML Input
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => addDateInput(arrayHelpers)}>
                                                    Date Input
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => addDateRangeInput(arrayHelpers)}>
                                                    Date Range Input
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => addSelectInput(arrayHelpers)}>
                                                    Select Input
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => addRadioInput(arrayHelpers)}>
                                                    Radio Input
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => addCheckboxInput(arrayHelpers)}>
                                                    Checkbox Input
                                                </Dropdown.Item>
                                            </Dropdown>
                                            <div className="mx-1"></div>
                                            <Dropdown
                                                label={`Connect Services (${selectedServices.length})`}
                                                gradientDuoTone="redToYellow"
                                            >
                                                {
                                                    services.map((service) => {
                                                        return (
                                                            <Dropdown.Item key={service.id} onClick={() => addServiceToForm(service, setFieldValue)}>
                                                                {selectedServices.findIndex((s) => s.id === service.id) >= 0 ? `✔ ` : ``}{service.name}
                                                            </Dropdown.Item>
                                                        )
                                                    })
                                                }
                                            </Dropdown>
                                        </div>
                                    </div>
                                )}
                            </FieldArray>
                            <Button type="submit" disabled={isSubmitting} className="mt-6" gradientDuoTone="greenToBlue" size="lg">
                                {isSubmitting ? (
                                    <><div className="mr-3">
                                        <Spinner
                                            size="sm"
                                            light={true}
                                        />
                                    </div>
                                        Saving ...
                                    </>) : isEdit ? `✎ Update Form` : `+ Submit Form`}
                            </Button>
                        </Form>
                    </div>
                </div>
            )}
        </Formik>
    )
}

export default FormCreate