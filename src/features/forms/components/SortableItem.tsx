import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormField } from "../types";
import Text from './edit/TextEdit';
import { Button } from "flowbite-react";

type SortableItemProps = {
    key: string;
    field: FormField;
    removeInput: (id: string) => void;
}

export function SortableItem(props: SortableItemProps) {
    const {
        attributes,
        listeners,
        setActivatorNodeRef,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.field.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const components = {
        "text": Text,
        "number": Text,
        "textarea": Text,
        "date": Text,
        "daterange": Text,
        "select": Text,
        "radio": Text,
        "checkbox": Text,
    };

    const Component = components[props.field.type || "text"];

    const removeInput = () => {
        props.removeInput(props.field.id);
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} className="flex w-full px-3">
            <div className="flex flex-col">
                <Button ref={setActivatorNodeRef} {...listeners} className="p-0 mt-3 mr-2" size="xs" color="light" pill={true}>
                    <span className="text-base leading-[21px]">✥</span>
                </Button>
                <Button onClick={removeInput} className="p-0 my-2 mr-2" size="xs" color="failure" pill={true}>
                    <span className="text-lg leading-[18px] text-bold block pb-1">×</span>
                </Button>
            </div>
            <Component {...props.field} inputProps={{ defaultValue: props.field.id, className: "w-full" }} />
        </div>
    );
}