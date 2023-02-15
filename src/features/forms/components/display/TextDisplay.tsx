import { Label, TextInput, TextInputProps } from "flowbite-react";

type Props = {
    label?: string;
    inputProps: TextInputProps;
}

const TextInputDisplay = (props: Props) => {
    return (
        <div>
            <div className="mb-2 block">
                <Label value={props.label} />
            </div> 
            <TextInput type="text" {...props.inputProps} />
        </div>
    )
}

export default TextInputDisplay;