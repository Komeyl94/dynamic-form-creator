import { Button, Checkbox, Dropdown, Label, Modal, TextInput, TextInputProps } from "flowbite-react";
import { useState } from "react";
import { camelCaseToNormal } from "../../../../utils/utilities";

type Props = {
    label?: string;
    inputProps: TextInputProps;
}

type Validations = {
    minLength: number | undefined;
    maxLength: number | undefined;
}

const TextInputEdit = (props: Props) => {
    const defaultValidationValue = { minLength: undefined, maxLength: undefined };
    const [validations, setValidations] = useState<Validations>(defaultValidationValue);
    const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);

    const openValidationModal = () => {
        setIsValidationModalOpen(true);
    }

    const closeValidationModal = () => {
        setIsValidationModalOpen(false);
        setValidations(defaultValidationValue);
    }

    const addMinLength = () => {
        if (validations.minLength === undefined) {
            setValidations({ ...validations, minLength: 3 });
        } else {
            setValidations({ ...validations, minLength: undefined });
        }
    }

    const addMaxLength = () => {
        if (validations.maxLength === undefined) {
            setValidations({ ...validations, maxLength: 16 });
        } else {
            setValidations({ ...validations, maxLength: undefined });
        }
    }

    return (
        <div className="flex flex-wrap items-stretch my-3 p-5 rounded-xl bg-slate-300">
            <div className="mb-1 flex w-full">
                <TextInput type="text" className="w-full" sizing="sm" placeholder="Enter input label" />
            </div>
            <div className="mb-1 flex w-full">
                <TextInput type="text" className="w-full" placeholder="Enter input placeholder" />
            </div>
            <div className="mb-4 flex w-full">
                <TextInput type="text" className="w-full" placeholder="Enter input description" />
            </div>
            <div className="mb-4 flex w-full">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="pl-3 leading-4">
                    Required
                </Label>
            </div>
            <div className="flex w-full">
                <Button color="dark" size="sm" pill={true} className="mx-1" onClick={openValidationModal}>+ Add Validation</Button>
                <Button color="dark" size="sm" pill={true} className="mx-1">+ Add Formatting</Button>
                <Button color="dark" size="sm" pill={true} className="mx-1">+ Add Permissions</Button>
            </div>
            <Modal
                dismissible={true}
                show={isValidationModalOpen}
                onClose={closeValidationModal}
            >
                <Modal.Header>
                    Add Validation
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 flex flex-col items-center">
                        <Dropdown
                            label="Select validation"
                        >
                            <Dropdown.Item onClick={addMinLength}>
                                {validations.minLength !== undefined ? `✔ ` : ``}Minimum character length
                            </Dropdown.Item>
                            <Dropdown.Item onClick={addMaxLength}>
                                {validations.maxLength !== undefined ? `✔ ` : ``}Maximum character length
                            </Dropdown.Item>
                        </Dropdown>
                        <form className="w-full">
                            {
                                Object.entries(validations).map((entry) => {
                                    if (entry[1] !== undefined) {
                                        return (<div key={entry[0]} className="w-full mb-4">
                                            <Label>{camelCaseToNormal(entry[0])}</Label>
                                            <TextInput
                                                type="number"
                                                defaultValue={entry[1]}
                                                className="w-full"
                                            />
                                            <small className="text-gray-500">{`Enter input ${camelCaseToNormal(entry[0])}`}</small>
                                        </div>);
                                    }
                                    return "";
                                })
                            }
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-between">
                    <Button
                        outline={true}
                        color="failure"
                        onClick={closeValidationModal}
                    >
                        Close
                    </Button>
                    <Button
                        gradientDuoTone="greenToBlue"
                        onClick={closeValidationModal}
                    >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TextInputEdit;