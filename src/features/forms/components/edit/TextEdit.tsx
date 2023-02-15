import { Button, Checkbox, Label, TextInput, TextInputProps } from "flowbite-react";

type Props = {
    label?: string;
    inputProps: TextInputProps;
}

const TextInputEdit = (props: Props) => {
    return (
        <div className="flex flex-wrap items-stretch my-3 p-5 rounded-xl bg-slate-300">
            <div className="mb-2 flex w-full">
                <TextInput type="text" className="w-full" placeholder="Enter input label" />
            </div>
            <div className="mb-2 flex w-full">
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
                <Button color="dark" size="sm" pill={true} className="mx-1">+ Add Rules</Button>
                <Button color="dark" size="sm" pill={true} className="mx-1">+ Add Formatting</Button>
                <Button color="dark" size="sm" pill={true} className="mx-1">+ Add Permissions</Button>
            </div>
        </div>
    )
}

export default TextInputEdit;