import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormField } from "../types";
import TextEdit from './edit/TextEdit';
import NumberEdit from './edit/NumberEdit';
import HTMLEdit from './edit/HTMLEdit';
import DateEdit from './edit/DateEdit';
import { Button } from "flowbite-react";

type SortableItemProps = {
    key: string;
    index: number;
    field: FormField;
    removeInput: (index: number) => void;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

export function SortableItem({ index, field, removeInput, setFieldValue }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setActivatorNodeRef,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: field.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const components = {
        "text": TextEdit,
        "number": NumberEdit,
        "html": HTMLEdit,
        "date": DateEdit,
        "daterange": TextEdit,
        "select": TextEdit,
        "radio": TextEdit,
        "checkbox": TextEdit,
    };

    const Component = components[field.type || "text"];

    const removeInputOnClick = () => {
        removeInput(index);
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} className="flex w-full px-3">
            <div className="flex flex-col">
                <Button ref={setActivatorNodeRef} {...listeners} className="p-0 mt-3 mr-2" size="xs" color="light" pill={true}>
                    <span className="text-base leading-[21px]">✥</span>
                </Button>
                <Button onClick={removeInputOnClick} className="p-0 my-2 mr-2" size="xs" color="failure" pill={true}>
                    <span className="text-lg leading-[18px] text-bold block pb-1">×</span>
                </Button>
            </div>
            <Component {...field} index={index} setFieldValue={setFieldValue} />
        </div>
    );
}