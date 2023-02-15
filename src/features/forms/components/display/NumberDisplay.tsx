import { Label, TextInput, TextInputProps } from "flowbite-react";

type Props = {
    label?: string;
    inputProps: TextInputProps;
}

const NumberInputDisplay = (props: Props) => {
    const inputProps = { ...Object.keys(props).filter(prop => prop !== "label") };
    console.log('inputProps', inputProps);
    return (
        <div>
            <div className="mb-2 block">
                <Label value={props.label} />
            </div>
            <TextInput type="number" {...props} />
        </div>
    )
}

export default NumberInputDisplay;