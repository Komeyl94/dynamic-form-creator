import { Textarea, TextInput } from "flowbite-react"
import { Button, Label } from "flowbite-react"
import { useState } from "react"
import { DndContext } from '@dnd-kit/core';
import { SortableContext, rectSwappingStrategy, arrayMove } from '@dnd-kit/sortable';
import { MeasuringStrategy } from '@dnd-kit/core';
import { SortableItem } from "./components/SortableItem";
import { Form, FormField } from "./types";

const measuringConfig = {
    droppable: {
        strategy: MeasuringStrategy.WhileDragging,
    }
}

type Props = {}

const FormCreate = (props: Props) => {
    const [form] = useState<Form>({
        display: "display text",
        fields: [],
        id: String(1),
        name: ""
    });
    const [fields, setFields] = useState<FormField[]>([]);

    const onInputAdd = () => {
        const newFields = [...fields];
        const random = Math.floor(Math.random() * (10000 - 10 + 1) + 10);
        newFields.push(
            {
                id: String(fields.length + random),
                description: "",
                label: "",
                formatting: "",
                inputProps: {},
                permission: "",
                validate: ""
            })
        setFields(newFields);
    }

    const handleDragEnd = (event: { active: any; over: any; }) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setFields((fields) => {
                const oldIndex = fields.findIndex(field => active.id === field.id);
                const newIndex = fields.findIndex(field => over.id === field.id);

                return arrayMove(fields, oldIndex, newIndex);
            });
        }
    };

    const removeInput = (id: string) => {
        const newFields = fields.filter((field) => field.id !== id);
        setFields(newFields);
    };

    return (
        <div className="flex flex-row justify-between">
            <div className="flex flex-col flex-1 items-center">
                Form Create
                <form className="flex flex-col gap-4 w-full pr-7">
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="form-name"
                                value="Form name"
                            />
                        </div>
                        <TextInput type="text" id="form-name" placeholder="Enter form name" />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="form-description"
                                value="Form description"
                            />
                        </div>
                        <Textarea id="form-description" placeholder="Enter form description"></Textarea>
                    </div>
                    <div className="bg-slate-200 p-8 rounded-xl flex flex-col">
                        <DndContext measuring={measuringConfig} onDragEnd={handleDragEnd}>
                            <SortableContext items={fields} strategy={rectSwappingStrategy} id={form.id}>
                                {fields.map(field => <SortableItem key={field.id} field={field} removeInput={removeInput} />)}
                            </SortableContext>
                        </DndContext>
                        {fields.length === 0 ? <div className="text-center opacity-50 w-full">Add Inputs from right pane <span className="text-xl leading-none">→</span></div> : ""}
                    </div>
                </form>
            </div>
            <div className="flex flex-col w-2/6">
                <h1 className="mb-8">Form Inputs</h1>
                <Button className="mb-4" pill={true} gradientDuoTone="purpleToBlue" outline={true} onClick={onInputAdd}><b className="text-xl leading-none">+</b> Add Text Input</Button>
                <Button className="mb-4" pill={true} gradientDuoTone="purpleToBlue" outline={true} onClick={onInputAdd}><b className="text-xl leading-none">+</b> Add Number Input</Button>
                <Button className="mb-4" pill={true} gradientDuoTone="purpleToBlue" outline={true} onClick={onInputAdd}><b className="text-xl leading-none">+</b> Add Textarea/HTML Input</Button>
                <Button className="mb-4" pill={true} gradientDuoTone="purpleToBlue" outline={true} onClick={onInputAdd}><b className="text-xl leading-none">+</b> Add Date Input</Button>
                <Button className="mb-4" pill={true} gradientDuoTone="purpleToBlue" outline={true} onClick={onInputAdd}><b className="text-xl leading-none">+</b> Add Date Range Input</Button>
                <Button className="mb-4" pill={true} gradientDuoTone="purpleToBlue" outline={true} onClick={onInputAdd}><b className="text-xl leading-none">+</b> Add Select Input</Button>
                <Button className="mb-4" pill={true} gradientDuoTone="purpleToBlue" outline={true} onClick={onInputAdd}><b className="text-xl leading-none">+</b> Add Radio Input</Button>
                <Button className="mb-4" pill={true} gradientDuoTone="purpleToBlue" outline={true} onClick={onInputAdd}><b className="text-xl leading-none">+</b> Add Checkbox Input</Button>
            </div>
        </div>
    )
}

export default FormCreate